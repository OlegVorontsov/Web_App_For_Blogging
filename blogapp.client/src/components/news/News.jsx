import ImageComponent from "../ImageComponent";
import { useEffect, useState } from "react";
import { deleteNews, getNews, getNewsByUser, updateNews } from "../../services/newsService";
import { Button } from "react-bootstrap";
import ModalButton from "../ModalButton";
import NewsCreate from "./NewsCreate";

// один пост
export const News = ({id, text, imgStr, date, isProfile, updateAction}) => {

    const updateNewsView = async (news) => {
        await updateNews(news);
        updateAction();
      };

      const deleteNewsView = async () => {
        await deleteNews(id);
        updateAction();
    };

    return (
        <div>
            { isProfile ? 
            <div className="news-view-item">
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                    <ModalButton
                        btnName={'Edit post'}
                        modalContent = {<NewsCreate
                                id={id}
                                oldText={text}
                                oldImg={imgStr}
                                setAction = {updateNewsView}/>}
                        title = 'Edit post' />
                    <Button variant="outline-danger" onClick={() => deleteNewsView()}>Delete post</Button>
                </div>
                <div>
                    <NewsView id={id} date={date} text={text} imgStr={imgStr} />
                </div>
            </div> :
            <div className="news-view-item">
                <NewsView id={id} date={date} text={text} imgStr={imgStr} />
            </div>
        }
        </div>
    )
}

//работает
const NewsView = ({date, text, imgStr}) => {
    return (
        <div style={{display: 'flex', gap: '20px'}}>
            <div style={{maxWidth: '350px', borderRadius: '5px', overflow: 'hidden'}}>
                <ImageComponent base64String={imgStr}/>
            </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

//работает
export const NewsProfileView = ({userId, isProfile}) => {
    const [news, setNews] = useState([]);

    const getAllNews = async () => {
        if (userId === 0) return;
        const allNews = await getNewsByUser(userId);
        setNews(allNews);
    }

    useEffect ( ()=> {
        getAllNews();
    },[userId]);

    return (
        <div>
            {news.map((el, key) => {
                return <News key={key} 
                    id = {el.id}
                    text = {el.text} 
                    imgStr={el.img} 
                    date={el.normalDate}
                    isProfile={isProfile}
                    updateAction={getAllNews}
                />
            })}
        </div>
    )
}

export const NewsForUser = () => {
    const [news, setNews] = useState([]);

    const getAllNews = async () => {
        const allNews = await getNews();
        setNews(allNews);
    }

    useEffect ( ()=> {
        getAllNews();
    },[]);

    return (
        <div>
            {news.map((el, key) => {
                return (
                    <div className="news-view-item">
                        <NewsView key={key}
                                date={el.normalDate}
                                text={el.text}
                                imgStr={el.img}/>
                    </div>
                )
            })}
        </div>
    )
}


import ImageComponent from "../ImageComponent";
import { useEffect, useState } from "react";
import { deleteNews, getNews, getNewsByUser, likeToNews, updateNews } from "../../services/newsService";
import { Button } from "react-bootstrap";
import ModalButton from "../ModalButton";
import NewsCreate from "./NewsCreate";
import { ALLNEWS_URL } from "../../services/commonService";

// один пост
export const News = ({id, text, imgStr, date, likes, isProfile, updateAction}) => {

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
            <div className="news-view-item box-shadow-blue">
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
                    <NewsView id={id} date={date} text={text} likes={likes} imgStr={imgStr} />
                </div>
            </div> :
            <div className="news-view-item box-shadow-blue">
                <NewsView id={id} date={date} text={text} likes={likes} imgStr={imgStr} />
            </div>
        }
        </div>
    )
}

//работает
const NewsView = ({id, date, text, imgStr, likes, liked}) => {

    const likeClick = async (newsId) => {
        await likeToNews(newsId);
        window.location.href = ALLNEWS_URL;
      }

    return (
        <div style={{display: 'flex', gap: '20px'}}>
            <div className="user-short-img" style={{height: '160px'}}>
                <ImageComponent base64String={imgStr}/>
            </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
                {liked === false ? 
                    <button className="btn like-btn" onClick={() => likeClick(id)}>
                        <small style={{color: '#007bff'}}>{likes}</small>
                    </button> :
                    <div className="like-img"> {likes}</div>
                }
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
                    likes={el.likesCount}
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
                    <div className="news-view-item box-shadow-blue">
                        <NewsView key={key}
                                id = {el.id}
                                date={el.normalDate}
                                text={el.text}
                                imgStr={el.img}
                                likes={el.likesCount}
                                liked={el.isLikedByUser}/>
                    </div>
                )
            })}
        </div>
    )
}


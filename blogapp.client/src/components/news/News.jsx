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
            <div className="news-btns">
                <ModalButton
                btnName={'Edit post'}
                    modalContent = {<NewsCreate
                            id={id}
                            oldText={text}
                            oldImg={imgStr}
                            setAction = {updateNewsView}/>}
                title = 'Edit post' />
            <Button variant="outline-danger" onClick={() => deleteNewsView()}>Delete post</Button>
            <NewsView id={id} date={date} text={text} imgStr={imgStr} />
        </div> :
<div>
    <NewsView id={id} date={date} text={text} imgStr={imgStr} />
</div>
        }
            

        </div>
    )
}

//работает
const NewsView = ({date, text, imgStr}) => {
    return (
    <div className="news-view-item">
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

{/*export const NewsByUser = ({userId}) => {

    const [news, setNews] = useState([]);

    const getAllNews = async () => {
        if(userId === 0) return;
        const allNews = await getNewsByUser(userId);
        setNews(allNews);
    }
    useEffect( ()=> {
        getAllNews();
    }, [userId]);

    return (
        <div>
            {news.map((el, key) => {
                return <NewsView key={key}
                text = {el.text}
                imgStr={el.img}
                date = {el.normalDate}/>
            })}
        </div>
    )
}*/}

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
                return <NewsView key={key}
                    date={el.postDate}
                    text={el.text}
                    imgStr={el.img}/>
            })}
        </div>
    )
}


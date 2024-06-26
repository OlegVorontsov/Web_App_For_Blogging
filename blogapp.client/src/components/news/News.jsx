import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent"
import { deleteNews, getNews, getNewsByUser, updateNews } from "../../services/newsService";
import ModalButton from "../ModalButton";
import NewsCreate from "./NewsCreate";

// один пост
export const News = ({id, text, imgStr, date, updateAction}) => {

    const updateNewsView = async (news) => {
        await updateNews(news);
        updateAction();
      };

      const deleteNewsView = async () => {
        await deleteNews(id);
        updateAction();
    };

    return (
        <div className='news-item'>
            <div style ={{display: 'flex', gap: '20px', justifyContent: 'flex-end'}}>
                <ModalButton
                btnName={'Edit post'}
                modalContent = {<NewsCreate id={id}
                    oldText={text}
                    oldImg={imgStr}
                    setAction = {updateNewsView}/>}
                title = 'Edit post' />
                <button className="btn btn-danger" onClick={() => deleteNewsView()}>Delete post</button>
            </div>
            <NewsView date={date} text={text} imgStr={imgStr}/>
        </div>
    )
}

const NewsView = ({date, text, imgStr}) => {
    return (
        <div>
            <div className="img-box">
                <ImageComponent base64String={imgStr}/>
            </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
        </div>)
        }

export const NewsProfileView = ({userId}) => {
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
                    date={el.postDate}
                    updateAction={getAllNews}
                />
            })}
        </div>
    )
}

export const NewsByUser = ({userId}) => {

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
                date = {el.postDate}/>
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
                return <NewsView key={key}
                    date={el.postDate}
                    text={el.text}
                    imgStr={el.img}/>
            })}
        </div>
    )
}

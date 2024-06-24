import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent"
import { deleteNews, getNewsByUser, updateNews } from "../../services/newsService";
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
                modalContent = {<NewsCreate
                    id={id}
                    oldText={text}
                    oldImg={imgStr}
                    setAction = {updateNewsView}/>}
                title = 'Edit post' />
                <button className="btn btn-danger" onClick={() => deleteNewsView()}>Delete post</button>
            </div>
                <div style ={{width: '50%'}}>
                    <ImageComponent base64String={imgStr} />
                </div>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}

export const NewsByUser = ({userId}) => {

    const [news, setNews] = useState([]);
    const [updateUser, setUpdateUser] = useState(0);

    const getAllNews = async () => {
        if(userId === 0) return;
        const allNews = await getNewsByUser(userId);
        setNews(allNews);
    }
    useEffect( ()=> {
        getAllNews();
    }, [userId, updateUser]);

    return (
        <div>
            {news.map((el, key) => {
                return <News key={key}
                id = {el.id}
                text = {el.text}
                imgStr={el.img}
                date = {el.postDate}
                updateAction={setUpdateUser}/>
            })}
        </div>
    )
}
export default NewsByUser;

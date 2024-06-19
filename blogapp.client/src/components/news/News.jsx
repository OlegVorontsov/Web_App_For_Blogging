import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent"
import { NEWS_URL, sendRequestWithToken } from "../../services/commonService";
import { getNewsByUser } from "../../services/newsService";

// один пост
export const News = ({text, imgStr, date}) => {

    return (
        <div className='news-item'>
            <div>
                <p>{date}</p>
                <p>{text}</p>
            </div>
            <ImageComponent base64String={imgStr} />
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
                return <News key={key} text = {el.text} imgStr={el.img} date = {el.postDate}/>
            })}
        </div>
    )
}
export default NewsByUser;

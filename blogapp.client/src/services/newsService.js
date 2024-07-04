import { NEWS_URL, sendRequestWithToken } from "./commonService";

export async function getNewsByUser(userId) {
    const allNews = await sendRequestWithToken(`${NEWS_URL}/${userId}`, 'GET');
    return allNews;
}

export async function getNews() {
    const allNews = await sendRequestWithToken(`${NEWS_URL}`, 'GET');
    return allNews;
}

export async function createNews(newNews) {
    newNews.img = newNews.img.toString();
    const news = await sendRequestWithToken(NEWS_URL, 'POST', newNews);
    return news;
}

export async function updateNews(news) {
    news.img = news.img.toString();
    const newsUpdated = await sendRequestWithToken(NEWS_URL, 'PATCH', news);
    return newsUpdated;
}

export async function deleteNews(newsId) {
    await sendRequestWithToken(`${NEWS_URL}/${newsId}`, 'DELETE');
}

export async function likeToNews(newsId) {
    await sendRequestWithToken(`${NEWS_URL}/Like/${newsId}`, 'POST', newsId);
}
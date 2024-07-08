using LiteDB;

namespace BlogApp.Server.Data
{
    public class NoSQLDataService
    {
        private readonly string DBPath = "BlogApp_NoSQLDB.db";

        private const string SubsCollection = "SubsCollection";
        private const string NewsLikesCollection = "NewsLikesCollection";
        private const string NewsDislikesCollection = "NewsDislikesCollection";

        public UserSubs GetUserSub(int userId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);
                var subForUser = subs.FindOne(x => x.Id == userId);
                return subForUser;
            }
        }
        public UserSubs SetUserSub(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);
                var subForUser = subs.FindOne(x => x.Id == from);
                var sub = new UserSub
                {
                    Id = to,
                    Date = DateTime.Now
                };
                if (subForUser != null)
                {
                    if (!subForUser.UserSubsList.Select(x => x.Id).Contains(to))
                    {
                        subForUser.UserSubsList.Add(sub);
                        subs.Update(subForUser);
                    }
                }
                else
                {
                    var newSubForUser = new UserSubs
                    {
                        Id = from,
                        UserSubsList = new List<UserSub> { sub }
                    };
                    subs.Insert(newSubForUser);
                    subs.EnsureIndex(x => x.Id);

                    subForUser = newSubForUser;
                }
                return subForUser;
            }
        }
        public UserSubs DeleteUserSub(int from, int to)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var subs = db.GetCollection<UserSubs>(SubsCollection);
                var subForUser = subs.FindOne(x => x.Id == from);
                if (subForUser != null)
                {
                    var sub = subForUser.UserSubsList.FirstOrDefault(s => s.Id == to);
                    if (sub != null)
                    {
                        subForUser.UserSubsList.Remove(sub);
                        subs.Update(subForUser);
                    }
                }
                return subForUser;
            }
        }
        public NewsLike GetNewsLike(int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var newsLike = likes.FindOne(x => x.NewsId == newsId);
                return newsLike;
            }
        }
        public NewsLike GetNewsDislike(int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var dislikes = db.GetCollection<NewsLike>(NewsDislikesCollection);
                var newsDislike = dislikes.FindOne(x => x.NewsId == newsId);
                return newsDislike;
            }
        }

        public NewsLike RemoveNewsLike(int from, int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var newsLikes = likes.FindOne(x => x.NewsId == newsId);
                if (newsLikes != null)
                {
                    if (newsLikes.UserIds.Contains(from))
                    {
                        newsLikes.UserIds.Remove(from);
                        likes.Update(newsLikes);
                    }
                }
                return newsLikes;
            }
        }

        public NewsLike SetNewsLike(int from, int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var disLikes = db.GetCollection<NewsDislike>(NewsDislikesCollection);
                var newsLikes = likes.FindOne(x => x.NewsId == newsId);
                var newsDislikes = disLikes.FindOne(d => d.NewsId == newsId);
                if (newsLikes != null)
                {
                    if (!newsLikes.UserIds.Contains(from))
                    {
                        newsLikes.UserIds.Add(from);
                        likes.Update(newsLikes);
                        if (newsDislikes.UserIds.Contains(from))
                        {
                            newsDislikes.UserIds.Remove(from);
                            disLikes.Update(newsDislikes);
                        }
                    }
                }
                else
                {
                    var newLikeForNews = new NewsLike
                    {
                        NewsId = newsId,
                        UserIds = new List<int> { from }
                    };
                    likes.Insert(newLikeForNews);
                    likes.EnsureIndex(x => x.NewsId);

                    newsLikes = newLikeForNews;

                    if (newsDislikes!=null && newsDislikes.UserIds.Contains(from))
                    {
                        newsDislikes.UserIds.Remove(from);
                        disLikes.Update(newsDislikes);
                    }
                }
                return newsLikes;
            }
        }
        public NewsDislike SetNewsDislike(int from, int newsId)
        {
            using (var db = new LiteDatabase(DBPath))
            {
                var likes = db.GetCollection<NewsLike>(NewsLikesCollection);
                var disLikes = db.GetCollection<NewsDislike>(NewsDislikesCollection);
                //получаем лайки и дислайки конктретного поста
                var newsLikes = likes.FindOne(l => l.NewsId == newsId);
                var newsDislikes = disLikes.FindOne(d => d.NewsId == newsId);
                //если есть дислайки
                if(newsDislikes != null)
                {
                    //есть ли дислайки от конктретного юзера
                    if (!newsDislikes.UserIds.Contains(from))
                    {
                        //если нет добавляем дислайк
                        newsDislikes.UserIds.Add(from);
                        disLikes.Update(newsDislikes);
                        //есть ли лайк от конктретного юзера на этот пост
                        if (newsLikes.UserIds.Contains(from))
                        {
                            //лайк есть - убираем его
                            newsLikes.UserIds.Remove(from);
                            likes.Update(newsLikes);
                        }
                    }
                }
                else
                {
                    //добавляем дислайк
                    var newDislikeForNews = new NewsDislike
                    {
                        NewsId = newsId,
                        UserIds = new List<int> { from }
                    };
                    disLikes.Insert(newDislikeForNews);
                    disLikes.EnsureIndex(x => x.NewsId);
                    newsDislikes = newDislikeForNews;
                    //убираем лайк
                    if (newsLikes != null && newsLikes.UserIds.Contains(from))
                    {
                        newsLikes.UserIds.Remove(from);
                        likes.Update(newsLikes);
                    }
                }
                return newsDislikes;
            }
        }
    }
}

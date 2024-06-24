using BlogApp.Server.Data;
using BlogApp.Server.Models;
using static System.Net.Mime.MediaTypeNames;

namespace BlogApp.Server.Services
{
    public class NewsService
    {
        private readonly DataContext _dataContext;
        private readonly NoSQLDataService _noSQLDataService;
        public NewsService(DataContext dataContext, NoSQLDataService noSQLDataService)
        {
            _dataContext = dataContext;
            _noSQLDataService = noSQLDataService;
        }
        public List<NewsView> GetByAuthor(int userId)
        {
            var news = _dataContext.News.Where(n => n.AuthorId == userId)
                                        .OrderBy(x => x.PostDate)
                                        .Reverse()
                                        .Select(ToView)
                                        .ToList();
            return news;
        }
        public NewsModel Create (NewsModel newsModel, int userId)
        {
            var newNews = new News
            {
                AuthorId = userId,
                Text = newsModel.Text,
                Img = ImgService.GetPhoto(newsModel.Img),
                PostDate = DateTime.Now
            };
            _dataContext.News.Add(newNews);
            _dataContext.SaveChanges();

            newsModel.Id = newNews.Id;
            newsModel.PostDate = newNews.PostDate;
            return newsModel;
        }
        public List<NewsModel> CreateNews(List<NewsModel> newsModels, int userId)
        {
            foreach (var newsModel in newsModels)
            {
                var newNews = new News
                {
                    AuthorId = userId,
                    Text = newsModel.Text,
                    Img = ImgService.GetPhoto(newsModel.Img),
                    PostDate = DateTime.Now
                };
                _dataContext.News.Add(newNews);
            }
            _dataContext.SaveChanges();
            return newsModels;
        }
        public NewsView Update(NewsModel newsModel, int userId)
        {
            var newsToUpdate = _dataContext.News
                                           .FirstOrDefault(n => n.Id == newsModel.Id && n.AuthorId == userId);
            if (newsToUpdate == null)
            {
                return null;
            }
            newsToUpdate.Text = newsModel.Text;
            var photo = ImgService.GetPhoto(newsModel.Img);
            if (!(newsToUpdate.Img?.Length > 10 && photo.Length < 10))
                newsToUpdate.Img = photo;
            _dataContext.News.Update(newsToUpdate);
            _dataContext.SaveChanges();

            var newsView = ToView(newsToUpdate);

            return newsView;
        }
        public void Delete(int newsId, int userId)
        {
            var newsToDelete = _dataContext.News
                                           .FirstOrDefault(n => n.Id == newsId && n.AuthorId == userId);
            if (newsToDelete == null)
            {
                return;
            }
            _dataContext.News.Remove(newsToDelete);
            _dataContext.SaveChangesAsync();
        }
        public List<NewsView> GetNewsForCurrentUser(int userId)
        {
            var subs = _noSQLDataService.GetUserSub(userId);
            var allNews = new List<NewsView>();
            if (subs is null) return allNews;
            foreach (var sub in subs.UserSubsList)
            {
                var allNewsByAuthor = _dataContext.News
                                                  .Where(n => n.AuthorId == sub.Id).ToList();
                allNews.AddRange(allNewsByAuthor.Select(ToView));
            }
            allNews.Sort(new NewsComparer());
            return allNews;
        }
        public void SetLike(int newsId, int userId)
        {
            _noSQLDataService.SetNewsLike(
                from: userId,
                newsId: newsId);
        }

        private NewsView ToView(News news)
        {
            var likes = _noSQLDataService.GetNewsLike(news.Id);
            var newsModel = new NewsView
            {
                Id = news.Id,
                Text = news.Text,
                Img = news.Img,
                PostDate = news.PostDate,
                LikesCount = likes?.UserIds.Count ?? 0
            };
            return newsModel;
        }
    }
    class NewsComparer : IComparer<NewsView>
    {
        public int Compare(NewsView? x, NewsView? y)
        {
            if(x.PostDate > y.PostDate) return -1;
            if (x.PostDate < y.PostDate) return 1;
            return 0;
        }
    }
}

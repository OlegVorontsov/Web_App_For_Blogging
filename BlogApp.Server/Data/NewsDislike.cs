using LiteDB;

namespace BlogApp.Server.Data
{
    public class NewsDislike
    {
        [BsonId]
        public int NewsId { get; set; }
        public List<int> UserIds { get; set; }
    }
}

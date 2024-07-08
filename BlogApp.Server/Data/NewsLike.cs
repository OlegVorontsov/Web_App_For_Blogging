using LiteDB;

namespace BlogApp.Server.Data
{
    public class NewsLike
    {
        [BsonId]
        public int NewsId { get; set; }
        public List<int> UserIds { get; set; }
    }
}

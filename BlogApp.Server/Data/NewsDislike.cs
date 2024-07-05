namespace BlogApp.Server.Data
{
    public class NewsDislike
    {
        public int NewsId { get; set; }
        public List<int> UserIds { get; set; }
    }
}

﻿namespace BlogApp.Server.Models
{
    public class NewsView
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public object Img { get; set; }
        public int? LikesCount { get; set; }
        public DateTime PostDate { get; set; }
        public string NormalDate { get; set; }
        public bool IsLikedByUser { get; set; }
    }
}

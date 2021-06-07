using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    //public class Blog
    //{
    //}

    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string DateCreate { get; set; }
        public string DatePublish { get; set; }
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }
        public string Summery { get; set; }
        public string Image { get; set; }
    }

    public class UploadImage
    {
        public IFormFile Image { get; set; }
    }

    public class PostComment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int ParentId { get; set; }
        public string Body { get; set; }
        public string DateCreate { get; set; }
        public string DateConfirm { get; set; }  
    }

    public class PostTag
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Tag { get; set; }
    }
}

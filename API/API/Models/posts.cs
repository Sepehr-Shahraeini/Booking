using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class posts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string DateCreate { get; set; }
        public string DatePublish { get; set; }
        public int AuthorId { get; set; }
        public int CategoryId { get; set; }
        public string Image { get; set; }
        public string Summery { get; set; }
    }
}

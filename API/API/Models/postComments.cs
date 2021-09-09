using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class postComments
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int ParentId { get; set; }
        public string DateCreate { get; set; }
        public string DateConfirm { get; set; }
    }
}

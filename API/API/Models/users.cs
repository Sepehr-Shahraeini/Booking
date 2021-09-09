using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class users
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? Role { get; set; }
    }
}

using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class ViewMonths
    {
        public int PsychoanalystId { get; set; }
        public int? PMonth { get; set; }
        public string PMonthName { get; set; }
        public int? PYear { get; set; }
    }
}

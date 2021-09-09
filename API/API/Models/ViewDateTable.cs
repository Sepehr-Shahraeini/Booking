using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class ViewDateTable
    {
        public int? availableCount { get; set; }
        public int? confirmedCount { get; set; }
        public int? available { get; set; }
        public int Id { get; set; }
        public int? PDate { get; set; }
        public DateTime? GDate { get; set; }
        public int? PMonth { get; set; }
        public string PMonthName { get; set; }
        public int? PYear { get; set; }
        public string PDayName { get; set; }
        public int? PsychoanalystId { get; set; }
    }
}

using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class DayGP
    {
        public DateTime GDate { get; set; }
        public string PDate { get; set; }
        public string PYearName { get; set; }
        public int? PYear { get; set; }
        public string PMonthName { get; set; }
        public int? PMonth { get; set; }
        public string PDayName { get; set; }
        public int? UtcDiff { get; set; }
        public DateTime? LocalDate { get; set; }
        public string PeriodFixTime { get; set; }
        public int? PDate2 { get; set; }
    }
}

using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class visitingTimes
    {
        public int ID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string WeekDays { get; set; }
        public int? PsychoanalystId { get; set; }

        public virtual psychoanalysts Psychoanalyst { get; set; }
    }
}

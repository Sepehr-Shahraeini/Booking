using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class availableTime
    {
        public availableTime()
        {
            calendars = new HashSet<calendars>();
        }

        public int PsychoanalystId { get; set; }
        public int DateId { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int Id { get; set; }
        public int? DateConfirmed { get; set; }
        public int? PatientId { get; set; }

        public virtual DateTable Date { get; set; }
        public virtual Patients Patient { get; set; }
        public virtual psychoanalysts Psychoanalyst { get; set; }
        public virtual ICollection<calendars> calendars { get; set; }
    }
}

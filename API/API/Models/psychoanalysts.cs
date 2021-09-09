using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class psychoanalysts
    {
        public psychoanalysts()
        {
            availableTime = new HashSet<availableTime>();
            calendars = new HashSet<calendars>();
            visitingTimes = new HashSet<visitingTimes>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string WeekDays { get; set; }
        public string ImageUrl { get; set; }
        public string About { get; set; }
        public string Sex { get; set; }
        public string Expertise { get; set; }

        public virtual ICollection<availableTime> availableTime { get; set; }
        public virtual ICollection<calendars> calendars { get; set; }
        public virtual ICollection<visitingTimes> visitingTimes { get; set; }
    }
}

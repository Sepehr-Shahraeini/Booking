using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class DateTable
    {
        public DateTable()
        {
            availableTime = new HashSet<availableTime>();
        }

        public int Id { get; set; }
        public int? PDate { get; set; }
        public DateTime? GDate { get; set; }
        public int? PYear { get; set; }
        public int? PMonth { get; set; }
        public int? PDay { get; set; }
        public string PMonthName { get; set; }
        public string PDayName { get; set; }

        public virtual ICollection<availableTime> availableTime { get; set; }
    }
}

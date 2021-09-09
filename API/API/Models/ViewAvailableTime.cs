using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class ViewAvailableTime
    {
        public int Id { get; set; }
        public int PsychoanalystId { get; set; }
        public int DateId { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int? DateConfirmed { get; set; }
        public int? PatientId { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public int? PDate { get; set; }
        public string PDayName { get; set; }
        public DateTime? GDate { get; set; }
        public int? PMonth { get; set; }
        public string PMonthName { get; set; }
        public int? PYear { get; set; }
        public int? PDay { get; set; }
    }
}

using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class calendars
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public int? TrackingNO { get; set; }
        public bool? IsEmergency { get; set; }
        public int? PatientId { get; set; }
        public int? PsychoanalystId { get; set; }
        public int? DateAmount { get; set; }
        public int? AvailableId { get; set; }

        public virtual availableTime Available { get; set; }
        public virtual Patients Patient { get; set; }
        public virtual psychoanalysts Psychoanalyst { get; set; }
    }
}

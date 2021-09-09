using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class ViewPatientInfo
    {
        public string Amount { get; set; }
        public bool? IsEmergency { get; set; }
        public int? TrackingNO { get; set; }
        public int? PatientId { get; set; }
        public int? PsychoanalystId { get; set; }
        public string ChildrenNum { get; set; }
        public string Education { get; set; }
        public string Email { get; set; }
        public string FieldOfStudy { get; set; }
        public string Introduced { get; set; }
        public string Job { get; set; }
        public string PatientMobile { get; set; }
        public string Reason { get; set; }
        public string Subject { get; set; }
        public string Age { get; set; }
        public string LastName { get; set; }
        public string Name { get; set; }
        public string MaritalStatus { get; set; }
        public int? PDate { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string psychoanalystsName { get; set; }
        public string psychoanalystsLastName { get; set; }
        public string psychoanalystMobile { get; set; }
    }
}

using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace API.Models
{
    public partial class Patients
    {
        public Patients()
        {
            availableTime = new HashSet<availableTime>();
            calendars = new HashSet<calendars>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Subject { get; set; }
        public string Reason { get; set; }
        public string Email { get; set; }
        public string MaritalStatus { get; set; }
        public string Age { get; set; }
        public string ChildrenNum { get; set; }
        public string Introduced { get; set; }
        public string Education { get; set; }
        public string Job { get; set; }
        public string FieldOfStudy { get; set; }

        public virtual ICollection<availableTime> availableTime { get; set; }
        public virtual ICollection<calendars> calendars { get; set; }
    }
}

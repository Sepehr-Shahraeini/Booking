using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;


namespace API.Models
{
    public class Patient
    {
        public string Name { get; set; }
        public int Id { get; set; }
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
        public string Password { get; set; }
        public List<Calendar> calendars { get; set; }

    }

    public class Calendar
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public int TrackingNO { get; set; }
        public bool IsEmergency { get; set; }
        public int PatientId { get; set; }
        public int PsychoanalystId { get; set; }
        public string DatePersian { get; set; }
        public string DateAmount { get; set; }
        public string Time { get; set; }

    }
}

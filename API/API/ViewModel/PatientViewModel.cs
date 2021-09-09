using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class PatientViewModel
    {
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
    }
}

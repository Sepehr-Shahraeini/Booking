using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class AvailableTimeViewModel
    {
        public int PsychoanalystId { get; set; }
        public int DateId { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int Id { get; set; }
        public int? DateConfirmed { get; set; }
        public int? PatientId { get; set; }

        public int? PDate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.ViewModel
{
    public class DateTableViewModel
    {
        public int Id { get; set; }
        public int? PDate { get; set; }
        public DateTime? GDate { get; set; }
        public int? PYear { get; set; }
        public int? PMonth { get; set; }
        public int? PDay { get; set; }
        public string PMonthName { get; set; }
        public string PDayName { get; set; }

        public List<int> availableTime { get; set; }
     //   public List<TimeSpan?> EndTime { get; set; }
     ///*   public List<int> PsycoanalystId { get; set;} */
     //   public List<int> DateConfirmed { get; set; }
     //   public List<int> PatientId { get; set; }
     //   public List<int> DateId { get; set; }
        

    }
}

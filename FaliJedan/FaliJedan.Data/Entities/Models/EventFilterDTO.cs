using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class EventFilterDTO
    {
        public List<Sport> Sports { get; set; }
        public DateTime TimeframeStartDate { get; set; }
        public DateTime TimeframeEndDate { get; set; }
        public double? CurrentLatitude { get; set; }
        public double? CurrentLongitude { get; set; }
    }
}

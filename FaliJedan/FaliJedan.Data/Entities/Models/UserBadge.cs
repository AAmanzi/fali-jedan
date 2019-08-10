using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class UserBadge
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public int BadgeId { get; set; }
        public Badge Badge { get; set; }
        
        public int Level { get; set; }
    }
}

using FaliJedan.Data.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class Badge
    {
        public int Id { get; set; }
        public ICollection<UserBadge> UserBadges { get; set; }

        public string Name { get; set; }
        public string RulesForAquire { get; set; }
        public BadgeType Type { get; set; }
    }
}

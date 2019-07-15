using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class UserFavouriteSport
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public int SportId { get; set; }
        public Sport Sport { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Value { get; set; }

        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}

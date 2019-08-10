using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class ReviewDTO
    {
        public EventUser EventUser { get; set; }

        public List<UserRatingDTO> UserRatings { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class UserRatingDTO
    {
        public Guid UserId { get; set; }

        public int Rating { get; set; }
    }
}

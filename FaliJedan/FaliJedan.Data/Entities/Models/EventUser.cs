﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class EventUser
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }

        [Required]
        public bool IsHost { get; set; }
        [Required]
        public bool IsApproved { get; set; }
        [Required]
        public bool IsCanceled { get; set; }
        public bool IsReviewed { get; set; }
    }
}

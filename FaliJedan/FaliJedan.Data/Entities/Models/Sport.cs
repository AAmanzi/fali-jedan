﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class Sport
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Event> Events { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public int SportId { get; set; }
        public Sport Sport { get; set; }
        public ICollection<EventUser> EventUsers { get; set; }

        [Required]
        public int CurrentNumberOfPlayers { get; set; }
        [Required]
        public int TargetNumberOfPlayers { get; set; }
        [Required]
        public DateTime EventStart { get; set; }
        [Required]
        public DateTime EventEnd { get; set; }
        [Required]
        public double LocationLongitude { get; set; }
        [Required]
        public double LocationLatitude { get; set; }
        public int TargetSkillLevel { get; set; }
        public string Description { get; set; }
        public bool IsInstantJoin { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

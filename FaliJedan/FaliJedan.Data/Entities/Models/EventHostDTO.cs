using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class EventHostDTO
    {
        public Event Event { get; set; }

        public User Host { get; set; }

        public EventHostDTO(Event e, FaliJedanContext context)
        {
            Event = e;
            var eventHost = context.EventUsers.ToList().FirstOrDefault(eu => eu.EventId == Event.Id && eu.IsHost);
            if (eventHost != null)
            {
                Host = context.Users.FirstOrDefault(u => u.Id == eventHost.UserId);
            }
        }
    }
}

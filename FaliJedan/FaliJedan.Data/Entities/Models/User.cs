using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public ICollection<UserFavouriteSport> UserFavouriteSports { get; set; }
        public ICollection<EventUser> EventUsers { get; set; }
        public Guid SubscriptionId { get; set; }
        public Subscription Subscription { get; set; }

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        [Required]
        public bool IsSuperUser { get; set; }
    }
}

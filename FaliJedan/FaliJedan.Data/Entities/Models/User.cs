﻿using System;
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
        public ICollection<EventUser> EventUsers { get; set; }
        public ICollection<UserBadge> UserBadges { get; set; }
        public Guid? SubscriptionId { get; set; }
        public Subscription Subscription { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; }

        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        [Required]
        public bool IsSuperUser { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int TotalRating { get; set; }
        public int NumberOfRatings { get; set; }
        public int UsersRatedCount { get; set; }
        public int AttendedEventCount { get; set; }
        public int HostedEventCount { get; set; }
    }
}

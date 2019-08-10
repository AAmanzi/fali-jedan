using System;
using System.Collections.Generic;
using System.Text;
using FaliJedan.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace FaliJedan.Data.Entities
{
    public class FaliJedanContext : DbContext
    {
        public FaliJedanContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Subscription> Subsctiptions { get; set; }
        public DbSet<Badge> Badges { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<EventUser> EventUsers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserBadge>()
                .HasKey(ub => new { ub.UserId, ub.BadgeId });
            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserBadges)
                .HasForeignKey(ub => ub.UserId);
            modelBuilder.Entity<UserBadge>()
                .HasOne(ub => ub.Badge)
                .WithMany(b => b.UserBadges)
                .HasForeignKey(ub => ub.BadgeId);

            modelBuilder.Entity<EventUser>()
                .HasKey(eu => new { eu.UserId, eu.EventId });
            modelBuilder.Entity<EventUser>()
                .HasOne(eu => eu.User)
                .WithMany(u => u.EventUsers)
                .HasForeignKey(eu => eu.UserId);
            modelBuilder.Entity<EventUser>()
                .HasOne(eu => eu.Event)
                .WithMany(e => e.EventUsers)
                .HasForeignKey(eu => eu.EventId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Subscription)
                .WithOne(s => s.User)
                .HasForeignKey<Subscription>(s => s.UserId);

            modelBuilder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithOne(u => u.Subscription)
                .HasForeignKey<User>(u => u.SubscriptionId);

            modelBuilder.Entity<Sport>().HasData(
                new Sport { Id = 1, Name = "Nogomet" },
                new Sport { Id = 2, Name = "Košarka"},
                new Sport { Id = 3, Name = "Tenis"},
                new Sport { Id = 4, Name = "Odbojka"},
                new Sport { Id = 5, Name = "Bicikliranje"},
                new Sport { Id = 6, Name = "Trčanje"},
                new Sport { Id = 7, Name = "Planinarenje"},
                new Sport { Id = 8, Name = "Pikado"},
                new Sport { Id = 9, Name = "Biljar"});
        }
    }
}
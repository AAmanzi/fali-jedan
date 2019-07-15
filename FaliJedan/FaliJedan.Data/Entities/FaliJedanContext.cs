using System;
using System.Collections.Generic;
using System.Text;
using FaliJedan.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace CashRegister.Data.Entities
{
    public class FaliJedanContext : DbContext
    {
        public FaliJedanContext(DbContextOptions options) : base(options)
        {
        }

        //public DbSet<Cashier> Cashiers { get; set; }
        //public DbSet<Product> Products { get; set; }
        //public DbSet<Receipt> Receipts { get; set; }
        //public DbSet<ReceiptProduct> ReceiptProducts { get; set; }
        //public DbSet<Register> Registers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserFavouriteSport>()
                .HasKey(ufs => new { ufs.UserId, ufs.SportId });
            modelBuilder.Entity<UserFavouriteSport>()
                .HasOne(ufs => ufs.User)
                .WithMany(u => u.UserFavouriteSports)
                .HasForeignKey(ufs => ufs.UserId);
            modelBuilder.Entity<UserFavouriteSport>()
                .HasOne(ufs => ufs.Sport)
                .WithMany(s => s.UserFavouriteSports)
                .HasForeignKey(ufs => ufs.SportId);

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
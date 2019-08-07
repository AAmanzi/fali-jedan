using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CashRegister.Data.Helpers;
using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace FaliJedan.Domain.Repositories.Interfaces
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(FaliJedanContext context)
        {
            _context = context;
        }

        private FaliJedanContext _context { get; set; }

        public bool AddUser(User userToAdd)
        {
            var doesUserExist = _context.Users.Any(u => u.Id == userToAdd.Id);
            if (doesUserExist)
                return false;
            if (userToAdd.Username.Length <= 3 || 
                userToAdd.Password.Length <= 5 || 
                string.IsNullOrWhiteSpace(userToAdd.Email) || 
                string.IsNullOrWhiteSpace(userToAdd.FirstName) || 
                string.IsNullOrWhiteSpace(userToAdd.LastName) || 
                userToAdd.DateOfBirth == null)
                return false;
            userToAdd.Password = HashHelper.Hash(userToAdd.Password);
            _context.Users.Add(userToAdd);
            _context.SaveChanges();
            return true;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.Include(u => u.Subscription).Include(u => u.UserBadges).ThenInclude(ub => ub.Badge).ToList();
        }

        public User GetUserById(Guid id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}

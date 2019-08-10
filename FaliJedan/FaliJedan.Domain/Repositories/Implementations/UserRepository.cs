using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FaliJedan.Domain.Helpers;
using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
            var doesUserExist = _context.Users.Any(u => u.Id == userToAdd.Id || u.Username == userToAdd.Username);
            if (doesUserExist)
                return false;
            if (userToAdd.Username.Length <= 3 || 
                userToAdd.Password.Length <= 5 || 
                string.IsNullOrWhiteSpace(userToAdd.Email) || 
                string.IsNullOrWhiteSpace(userToAdd.FirstName) || 
                string.IsNullOrWhiteSpace(userToAdd.LastName))
                return false;

            userToAdd.CreatedOn = DateTime.Now;
            userToAdd.Id = Guid.NewGuid();
            userToAdd.Password = HashHelper.Hash(userToAdd.Password);
            _context.Users.Add(userToAdd);
            _context.SaveChanges();
            return true;
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.Include(u => u.Subscription).Include(u => u.UserBadges).ThenInclude(ub => ub.Badge)
                .ToList();
        }

        public User GetUserById(Guid id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public List<RefreshToken> GetRefreshTokens(Guid userId)
        {
            return _context.Users.Include(u => u.RefreshTokens).First(u => u.Id == userId).RefreshTokens.ToList();
        }

        public void DeleteRefreshToken(Guid userId, string refreshToken)
        {
            var a = _context.RefreshTokens.FirstOrDefault(rt => rt.Value == refreshToken);
            if(a == null)
            {
                return;
            }
            _context.RefreshTokens.Remove(a);
            _context.SaveChanges();
        }

        public void SaveRefreshToken(Guid userId, string refreshToken)
        {
            var refreshTokenToAdd = new RefreshToken
                {Value = refreshToken, UserId = userId, User = _context.Users.Find(userId)};
            _context.RefreshTokens.Add(refreshTokenToAdd);
            _context.Users.Find(userId).RefreshTokens.Add(refreshTokenToAdd);
            _context.SaveChanges();
        }

        public Guid? Login(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(u =>
                HashHelper.ValidatePassword(password, u.Password) && username == u.Username);

            return user?.Id;
        }
    }
}

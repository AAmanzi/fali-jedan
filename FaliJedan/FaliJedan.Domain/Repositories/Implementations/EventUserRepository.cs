using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Implementations
{
    public class EventUserRepository : IEventUserRepository
    {
        public EventUserRepository(FaliJedanContext context)
        {
            _context = context;
        }

        private FaliJedanContext _context { get; set; }

        public bool AddEventUser(Guid eventGuid, Guid userId)
        {


            var userToAdd = _context.Users.Find(userId);
            var eventToAdd = _context.Events.Find(eventGuid);
            if(eventToAdd == null || userToAdd == null)
                return false;

            if(eventToAdd.CurrentNumberOfPlayers >= eventToAdd.TargetNumberOfPlayers)
                return false;

            var eventUser = new EventUser
            {
                EventId = eventGuid,
                Event = _context.Events.Find(eventGuid),
                UserId = userId,
                User = _context.Users.Find(userId),
                IsReviewed = false,
                IsApproved = false,
                IsCanceled = false,
                IsHost = false
            };

            if (eventToAdd.IsInstantJoin)
            {
                eventUser.IsApproved = true;
                eventToAdd.CurrentNumberOfPlayers++;
            }
            _context.EventUsers.Add(eventUser);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteEventUser(EventUser eventUser)
        {
            var eventUserToDelete = _context.EventUsers.Include(eu => eu.Event).FirstOrDefault(eu => eu.UserId == eventUser.UserId && eu.EventId == eventUser.EventId);
            _context.EventUsers.Remove(eventUserToDelete);
            _context.SaveChanges();
            return true;
        }

        public bool ConfirmEventUser(EventUser eventUser)
        {
            var eventUserToConfirm = _context.EventUsers.Include(eu => eu.Event).FirstOrDefault(eu => eu.UserId == eventUser.UserId && eu.EventId == eventUser.EventId);
            if (eventUserToConfirm == null)
                return false;
            if (eventUserToConfirm.Event.CurrentNumberOfPlayers >= eventUserToConfirm.Event.TargetNumberOfPlayers)
                return false;

            eventUserToConfirm.Event.CurrentNumberOfPlayers++;
            eventUserToConfirm.IsApproved = true;
            _context.SaveChanges();
            return true;
        }

        public bool ReviewEventUser(ReviewDTO review)
        {
            var eventUser = _context.EventUsers.FirstOrDefault(eu => eu.UserId == review.EventUser.UserId && eu.EventId == review.EventUser.EventId);
            if (eventUser == null)
                return false;

            var eventToReview = _context.Events.Include(e => e.EventUsers).ThenInclude(eu => eu.User).First(e => e.Id == review.EventUser.EventId);
            eventUser.IsReviewed = true;
            review.UserRatings.ForEach(ur => {
                if(eventToReview.EventUsers.Any(eu => eu.UserId == ur.UserId) && 
                    ur.Rating > 0 && 
                    ur.Rating < 6)
                {
                        _context.Users.Find(ur.UserId).TotalRating += ur.Rating;
                        _context.Users.Find(ur.UserId).NumberOfRatings++;
                }
            });
            _context.SaveChanges();
            return true;
        }

        public List<EventUser> GetUnconfirmedEventUsers(Guid userId)
        {
            var data = new List<EventUser>();
            var b = _context.EventUsers.Include(eu => eu.Event).ThenInclude(e => e.EventUsers).Where(eu => userId == eu.UserId && eu.IsHost);
            b.ToList().ForEach(eu => {
                var eventUsers = _context.EventUsers
                .Include(eU => eU.Event)
                .ThenInclude(events => events.EventUsers)
                .Include(eU => eU.User)
                .First(c => c.UserId == eu.UserId && c.EventId == eu.EventId).Event.EventUsers
                .Where(eUser => !eUser.IsApproved && eUser.Event.CurrentNumberOfPlayers < eUser.Event.TargetNumberOfPlayers);
                if(eventUsers != null)
                {
                    data.AddRange(eventUsers);
                }
            });
            return data;
        }
    }
}

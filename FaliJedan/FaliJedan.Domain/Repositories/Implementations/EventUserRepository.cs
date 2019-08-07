using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
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

        public bool AddEventUser(EventUser eventUser)
        {
            var userToAdd = _context.Users.Find(eventUser.UserId);
            var eventToAdd = _context.Events.Find(eventUser.EventId);
            if(eventToAdd == null || userToAdd == null)
                return false;

            if(eventToAdd.CurrentNumberOfPlayers >= eventToAdd.TargetNumberOfPlayers)
                return false;

            _context.EventUsers.Add(eventUser);
            if (eventToAdd.IsInstantJoin)
            {
                eventToAdd.CurrentNumberOfPlayers++;
            }
            _context.SaveChanges();
            return true;
        }

        public bool DeleteEventUser(EventUser eventUser)
        {
            var userToAdd = _context.Users.Find(eventUser.UserId);
            var eventToAdd = _context.Events.Find(eventUser.EventId);
            if (eventToAdd == null || userToAdd == null)
                return false;

            _context.EventUsers.Add(eventUser);
            if (eventUser.IsApproved)
            {
                eventUser.Event.CurrentNumberOfPlayers--;
                eventUser.IsCanceled = true;
            }
            _context.SaveChanges();
            return true;
        }

        public bool ConfirmEventUser(EventUser eventUser)
        {
            var eventUserToConfirm = _context.EventUsers.FirstOrDefault(eu => eu.UserId == eventUser.UserId && eu.EventId == eventUser.EventId);
            if (eventUserToConfirm == null)
                return false;
            if (eventUserToConfirm.Event.CurrentNumberOfPlayers >= eventUserToConfirm.Event.TargetNumberOfPlayers)
                return false;

            eventUserToConfirm.Event.CurrentNumberOfPlayers++;
            eventUser.IsApproved = true;
            _context.SaveChanges();
            return true;
        }
    }
}

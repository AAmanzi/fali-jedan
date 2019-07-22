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
    public class EventRepository : IEventRepository
    {
        public EventRepository(FaliJedanContext context)
        {
            _context = context;
        }

        public FaliJedanContext _context { get; set; }

        public bool AddEvent(Event eventToAdd)
        {
            if (eventToAdd.CurrentNumberOfPlayers < 1 || eventToAdd.TargetNumberOfPlayers < 2 ||
                eventToAdd.DateOfEvent == null || eventToAdd.StartTime == null || eventToAdd.GeoLocation == null)
                return false;

            var doesEventExist = _context.Events.Any(e => e.Id == eventToAdd.Id);
            if (doesEventExist)
                return false;

            _context.Events.Add(eventToAdd);
            _context.SaveChanges();
            return true;
        }

        public bool DeleteEventById(Guid id)
        {
            var eventToDelete = _context.Events.FirstOrDefault(e => e.Id == id);
            if (eventToDelete == null)
                return false;
            return true;
        }

        public List<Event> GetAllEvents()
        {
            return _context.Events.Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User).ToList();
        }

        public Event GetEventById(Guid id)
        {
            return _context.Events.FirstOrDefault(e => e.Id == id);
        }
    }
}

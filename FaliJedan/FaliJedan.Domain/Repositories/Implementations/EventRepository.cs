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
            if (
                eventToAdd.CurrentNumberOfPlayers < 1 || 
                eventToAdd.TargetNumberOfPlayers < 2 ||
                eventToAdd.TargetNumberOfPlayers > eventToAdd.CurrentNumberOfPlayers ||
                eventToAdd.DateOfEvent.Date < DateTime.Now.Date ||
                eventToAdd.StartTime == null || 
                eventToAdd.StartTime <= eventToAdd.EndTime ||
                eventToAdd.LocationLongitude == null || 
                eventToAdd.LocationLatitude == null
                )
                return false;

            var doesEventExist = _context.Events.Any(e => e.Id == eventToAdd.Id);
            if (doesEventExist)
                return false;

            eventToAdd.Sport = _context.Sports.Find(eventToAdd.SportId);
            eventToAdd.DateCreated = DateTime.Now;
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

        public List<Event> GetFilteredEvents(EventFilterDTO filters)
        {
            List<Event> events = new List<Event>();

            if(filters.Sports.Count == 0 && filters.TimeframeStartDate == null)
            {
                events = _context.Events.Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User).ToList();
            }

            else if(filters.Sports.Count > 0 && filters.TimeframeStartDate == null)
            {
                filters.Sports.ForEach(sport => events.AddRange(
                    _context.Events.Where(
                        e => e.Sport.Id == sport.Id)
                    .Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User)));
            }

            else if(filters.TimeframeStartDate != null && filters.Sports.Count == 0)
            {
                if(filters.TimeframeEndDate == null)
                {
                    events.AddRange(_context.Events.Where(e => e.DateOfEvent >= filters.TimeframeStartDate)
                        .Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User));
                }
                else
                {
                    events.AddRange(
                        _context.Events.Where(e => e.DateOfEvent >= filters.TimeframeStartDate && 
                        e.DateOfEvent <= filters.TimeframeEndDate)
                        .Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User));
                }
            }

            else
            {
                filters.Sports.ForEach(sport => events.AddRange(
                    _context.Events.Where(
                        e => e.Sport.Name == sport.Name && 
                        e.DateOfEvent.Date >= filters.TimeframeStartDate.Date &&
                        e.DateOfEvent.Date <= filters.TimeframeEndDate)
                    .Include(e => e.Sport).Include(e => e.EventUsers).ThenInclude(eu => eu.User)));

            }

            if(filters.CurrentLatitude != null && filters.CurrentLongitude != null)
            {
                events.OrderBy(e => e.DateOfEvent)
                .ThenBy(e => Math.Sqrt(
                    Math.Pow(filters.CurrentLatitude.Value - e.LocationLatitude, 2) +
                    Math.Pow(filters.CurrentLongitude.Value - e.LocationLongitude, 2)
                ));
            }
            else
            {
                events.OrderBy(e => e.DateOfEvent);
            }


            return events;
        }
    }
}

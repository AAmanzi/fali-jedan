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
            var eventToDelete = _context.Events.Find(id);
            if (eventToDelete == null)
                return false;
            return true;
        }

        public List<EventHostDTO> GetAvailableEvents()
        {
            var availableEvents = new List<EventHostDTO>();

            _context.Events
                .Include(e => e.Sport)
                .Include(e => e.EventUsers)
                .ThenInclude(eu => eu.User)
                .ToList()
                .ForEach(
                    e => {
                        if (((e.DateOfEvent == DateTime.Now.Date &&
                        e.EndTime.TimeOfDay > DateTime.Now.TimeOfDay)
                        || e.DateOfEvent > DateTime.Now.Date) &&
                        e.CurrentNumberOfPlayers < e.TargetNumberOfPlayers) {
                        availableEvents.Add(new EventHostDTO(e, _context));            
                    }}
            );
            return availableEvents;
        }

        public Event GetEventById(Guid id)
        {
            return _context.Events.Find(id);
        }

        public List<EventHostDTO> GetFilteredEvents(EventFilterDTO filters)
        {
            List<Event> events = new List<Event>();

            if (filters.Sports.Count == 0)
            {
                events = _context.Events
                    .Include(e => e.Sport)
                    .Include(e => e.EventUsers)
                    .ThenInclude(eu => eu.User)
                    .Where(
                    e => ((e.DateOfEvent == DateTime.Now.Date &&
                        e.EndTime.TimeOfDay > DateTime.Now.TimeOfDay) 
                        || e.DateOfEvent > DateTime.Now.Date) && 
                        e.CurrentNumberOfPlayers < e.TargetNumberOfPlayers)
                    .ToList();
            }
            else
            {
                filters.Sports.ForEach(sport => events.AddRange(
                    _context.Events
                    .Where(
                        e => 
                        e.Sport.Id == sport.Id && 
                        ((e.DateOfEvent == DateTime.Now.Date &&
                        e.EndTime.TimeOfDay > DateTime.Now.TimeOfDay)
                        || e.DateOfEvent > DateTime.Now.Date) &&
                        e.CurrentNumberOfPlayers < e.TargetNumberOfPlayers)
                    .Include(e => e.Sport)
                    .Include(e => e.EventUsers)
                    .ThenInclude(eu => eu.User).ToList()));
            }

            if (filters.TimeframeStartDate != null) {
                events = events.Where(e => e.DateOfEvent >= filters.TimeframeStartDate).ToList();
            }
            if (filters.TimeframeEndDate != null)
            {
                events = events.Where(e => e.DateOfEvent <= filters.TimeframeEndDate).ToList();
            }

            if (filters.CurrentLatitude != null && filters.CurrentLongitude != null)
            {
                events.OrderBy(e => e.DateOfEvent)
                .ThenBy(e => Math.Sqrt(
                    Math.Pow(filters.CurrentLatitude.Value - e.LocationLatitude, 2) +
                    Math.Pow(filters.CurrentLongitude.Value - e.LocationLongitude, 2)
                ));
            }

            else
            {
                events.OrderBy(e => e.DateOfEvent).ThenBy(e => e.StartTime);
            }

            var eventHosts = new List<EventHostDTO>();

            events.ForEach(e => {
                eventHosts.Add(new EventHostDTO(e, _context));
            });

            return eventHosts;
        }
    }
}

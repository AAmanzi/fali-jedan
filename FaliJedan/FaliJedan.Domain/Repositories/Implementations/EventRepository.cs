using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        private FaliJedanContext _context { get; set; }

        public Guid? AddEvent(Event eventToAdd)
        {
            if (
                eventToAdd.CurrentNumberOfPlayers < 1 || 
                eventToAdd.TargetNumberOfPlayers < 2 ||
                eventToAdd.TargetNumberOfPlayers <= eventToAdd.CurrentNumberOfPlayers ||
                eventToAdd.EventStart <= eventToAdd.EventEnd ||
                eventToAdd.EventStart > DateTime.Now
                )
                return null;

            var doesEventExist = _context.Events.Any(e => e.Id == eventToAdd.Id);
            if (doesEventExist)
                return null;

            _context.EventUsers.Add(new EventUser
            {
                //User = userToAdd,
                //UserId = userToAdd.Id,
                Event = eventToAdd,
                EventId = eventToAdd.Id,
                IsApproved = eventToAdd.IsInstantJoin ? true : false,
                IsCanceled = false,
                IsHost = true
            });

            eventToAdd.Sport = _context.Sports.Find(eventToAdd.SportId);
            eventToAdd.DateCreated = DateTime.Now;
            _context.Events.Add(eventToAdd);
            _context.SaveChanges();
            return eventToAdd.Id;
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
                        if (DateTime.Compare(e.EventStart, DateTime.Now) > 0  &&
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

        public List<Event> GetEventsByUserId(Guid userId)
        {
            return _context.EventUsers.Where(
                eu => 
                eu.UserId == userId && 
                !eu.IsCanceled && 
                DateTime.Compare(eu.Event.EventEnd, DateTime.Now) > 0)
                .Select(eu => eu.Event)
                .Include(e => e.Sport)
                .Include(e => e.EventUsers)
                .ThenInclude(eu => eu.User).ToList();
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
                    e => (DateTime.Compare(e.EventEnd, DateTime.Now) <= 0 &&
                        e.CurrentNumberOfPlayers < e.TargetNumberOfPlayers))
                    .ToList();
            }
            else
            {
                filters.Sports.ForEach(sport => events.AddRange(
                    _context.Events
                    .Where(
                        e => 
                        e.Sport.Id == sport.Id &&
                        (DateTime.Compare(e.EventStart, DateTime.Now) > 0) &&
                        e.CurrentNumberOfPlayers < e.TargetNumberOfPlayers)
                    .Include(e => e.Sport)
                    .Include(e => e.EventUsers)
                    .ThenInclude(eu => eu.User).ToList()));
            }

            if (filters.CurrentLatitude != null && filters.CurrentLongitude != null)
            {
                events.OrderByDescending(e => e.EventStart)
                .ThenBy(e => Math.Sqrt(
                    Math.Pow(filters.CurrentLatitude.Value - e.LocationLatitude, 2) +
                    Math.Pow(filters.CurrentLongitude.Value - e.LocationLongitude, 2)
                ));
            }

            else
            {
                events.OrderByDescending(e => e.EventStart);
            }

            var eventHosts = new List<EventHostDTO>();

            events.ForEach(e => {
                if (filters.TimeframeEndDate != null)
                {
                    if(
                        e.EventStart > filters.TimeframeStartDate &&
                        e.EventEnd < filters.TimeframeEndDate
                    )
                    {
                        eventHosts.Add(new EventHostDTO(e, _context));
                    }
                }
                else
                {
                    if(
                        e.EventStart > filters.TimeframeStartDate
                    )
                    {
                        eventHosts.Add(new EventHostDTO(e, _context));
                    }
                }
            });

            return eventHosts;
        }
    }
}

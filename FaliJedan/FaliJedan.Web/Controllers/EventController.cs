using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FaliJedan.Web.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        private readonly IEventRepository _eventRepository;

        [Authorize]
        [HttpGet("all")]
        public IActionResult GetAllEvents()
        {
            return Ok(_eventRepository.GetAvailableEvents());
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult AddEvent(Event eventToAdd)
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return Forbid();
            var claims = identity.Claims.ToList();
            var id = Guid.Parse(claims.First(c => c.Type == "userId").Value);

            var eventId = _eventRepository.AddEvent(eventToAdd, id);
            if (eventId != null)
                return Ok(eventId.Value);

            return Forbid();
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult DeleteEventById(Guid eventId)
        {
            var wasDeleteSuccessful = _eventRepository.DeleteEventById(eventId);
            if (wasDeleteSuccessful)
                return Ok();
            return Forbid();
        }

        [Authorize]
        [HttpGet("get-by-id")]
        public IActionResult GetEventById(Guid id)
        {
            var eventById = _eventRepository.GetEventById(id);
            if (eventById != null)
                return Ok(eventById);
            return NotFound();
        }

        [Authorize]
        [HttpPost("filtered")]
        public IActionResult GetFilteredEvents(EventFilterDTO filters)
        {
            var filteredEvents = _eventRepository.GetFilteredEvents(filters);
            
            return Ok(filteredEvents);
        }

        [Authorize]
        [HttpGet("get-unreviewed")]
        public IActionResult GetUnreviewed()
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return NotFound();
            var claims = identity.Claims.ToList();
            var id = Guid.Parse(claims.First(c => c.Type == "userId").Value);

            var eventByUserId = _eventRepository.GetUnreviewedEventByUserId(id);
            if (eventByUserId != null)
                return Ok(eventByUserId);

            return NotFound();
        }

        [Authorize]
        [HttpGet("get-upcoming")]
        public IActionResult GetEventsByUserId()
        {
            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return NotFound();
            var claims = identity.Claims.ToList();
            var id = Guid.Parse(claims.First(c => c.Type == "userId").Value);

            var eventsByUserId = _eventRepository.GetEventsByUserId(id);
            if (eventsByUserId != null)
                return Ok(eventsByUserId);

            return NotFound();
        }
    }
}

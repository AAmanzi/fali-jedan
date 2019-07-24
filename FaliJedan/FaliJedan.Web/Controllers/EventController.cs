using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
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

        [HttpGet("all")]
        public IActionResult GetAllEvents()
        {
            return Ok(_eventRepository.GetAllEvents());

        }

        [HttpPost("add")]
        public IActionResult AddEvent(Event eventToAdd)
        {
            var wasAddSuccessful = _eventRepository.AddEvent(eventToAdd);
            if (wasAddSuccessful)
                return Ok();
            return Forbid();
        }

        [HttpPost("delete")]
        public IActionResult DeleteEventById(Guid eventId)
        {
            var wasDeleteSuccessful = _eventRepository.DeleteEventById(eventId);
            if (wasDeleteSuccessful)
                return Ok();
            return Forbid();
        }

        [HttpGet("get-by-id")]
        public IActionResult GetEventById(Guid id)
        {
            var eventById = _eventRepository.GetEventById(id);
            if (eventById != null)
                return Ok(eventById);
            return NotFound();
        }
    }
}

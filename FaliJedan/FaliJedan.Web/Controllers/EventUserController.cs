using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FaliJedan.Web.Controllers
{
    [Route("api/eventUsers")]
    [ApiController]
    public class EventUserController : ControllerBase
    {
        public EventUserController(IEventUserRepository eventUserRepository)
        {
            _eventUserRepository = eventUserRepository;
        }

        private readonly IEventUserRepository _eventUserRepository;


        [Authorize]
        [HttpPost("add")]
        public IActionResult AddEventUser(EventUser eventUserToAdd)
        {
            var wasAddSuccessful = _eventUserRepository.AddEventUser(eventUserToAdd);
            if (wasAddSuccessful)
                return Ok();
            return Forbid();
        }

        [Authorize]
        [HttpPost("delete")]
        public IActionResult DeleteEventUserById(EventUser eventUser)
        {
            var wasDeleteSuccessful = _eventUserRepository.DeleteEventUser(eventUser);
            if (wasDeleteSuccessful)
                return Ok();
            return Forbid();
        }

        [Authorize]
        [HttpPost("confirm")]
        public IActionResult ConfirmEventUser(EventUser eventUser)
        {
            var wasConfirmSuccesful = _eventUserRepository.ConfirmEventUser(eventUser);
            if (wasConfirmSuccesful)
                return Ok();
            return NotFound();
        }

        [Authorize]
        [HttpPost("review")]
        public IActionResult ReviewEventUser(ReviewDTO review)
        {
            var wasReviewSuccesful = _eventUserRepository.ReviewEventUser(review);
            if (wasReviewSuccesful)
                return Ok();
            return NotFound();
        }
    }
}

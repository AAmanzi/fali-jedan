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
using Newtonsoft.Json.Linq;

namespace FaliJedan.Web.Controllers
{
    [Route("api/event-users")]
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
        public IActionResult AddEventUser(JObject eventId)
        {
            var eventGuidString = eventId["eventId"].ToString();
            var eventGuid = Guid.Parse(eventGuidString);


            if (!(HttpContext.User.Identity is ClaimsIdentity identity)) return Forbid();
            var claims = identity.Claims.ToList();
            var userId = Guid.Parse(claims.First(c => c.Type == "userId").Value);

            var eventUserToAdd = new EventUser
            {
                EventId = eventGuid,
                UserId = userId,
                IsReviewed = false,
                IsApproved = false,
                IsCanceled = false,
                IsHost = false
            };

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

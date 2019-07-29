using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FaliJedan.Web.Controllers
{
    [Route("api/sports")]
    [ApiController]
    public class SportController : ControllerBase
    {
        public SportController(ISportRepository sportRepository)
        {
            _sportRepository = sportRepository;
        }

        private readonly ISportRepository _sportRepository;

        [HttpGet("all")]
        public IActionResult GetAllSports()
        {
            return Ok(_sportRepository.GetAllSports());
        }
    }
}

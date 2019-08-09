using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("all")]
        public IActionResult GetAllSports()
        {
            return Ok(_sportRepository.GetAllSports());
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FaliJedan.Domain.Helpers;
using FaliJedan.Domain.Repositories.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using FaliJedan.Data.Entities.Models;
using System.Security.Claims;

namespace FaliJedan.Web.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        private readonly IUserRepository _userRepository;

        [HttpPost("refresh")]
        public IActionResult Refresh(string token, string refreshToken)
        {
            var jwtHelper = new JwtHelper();
            var principal = jwtHelper.GetPrincipalFromExpiredToken(token);
            var userId = Guid.Parse(principal.Identity.Name);
            var savedRefreshToken = _userRepository.GetRefreshTokens(userId); //retrieve the refresh token from a data store
            if (savedRefreshToken.Any(rt => rt.Value == refreshToken))
                throw new SecurityTokenException("Invalid refresh token");

            var newJwtToken = jwtHelper.GenerateToken(principal.Claims);
            var newRefreshToken = jwtHelper.GenerateRefreshToken();
            _userRepository.DeleteRefreshToken(refreshToken);
            _userRepository.SaveRefreshToken(userId, newRefreshToken);

            return new ObjectResult(new
            {
                token = newJwtToken,
                refreshToken = newRefreshToken
            });
        }

        [HttpPost("add")]
        public IActionResult AddUser(User userToAdd)
        {

            var wasAddSuccessful = _userRepository.AddUser(userToAdd);
            if (wasAddSuccessful)
                return Ok();
            return Forbid();
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO login)
        {
            var wasLoginSuccessful = _userRepository.Login(login.Username, login.Password);

            if (wasLoginSuccessful != null)
            {
                var jwtHelper = new JwtHelper();
                var newJwtToken = jwtHelper.GenerateToken(new Claim[] { new Claim(ClaimTypes.Name, login.Username), new Claim("userId", $"{wasLoginSuccessful.Value}")});
                var newRefreshToken = jwtHelper.GenerateRefreshToken();
                return Ok(new ObjectResult(new
                {
                    token = newJwtToken,
                    refreshToken = newRefreshToken
                }));
            }
            return Forbid();
        }

    }
}
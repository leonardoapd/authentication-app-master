using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthBackend.Entities;
using AuthBackend.Repositories;
using AuthBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthBackend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        private readonly IGitHubLoginService _gitHubLoginService;
        private readonly ITokenService _tokenService;

        public UserController(IUserRepository usersRepository, IGitHubLoginService gitHubLoginService, ITokenService tokenService)
        {
            _usersRepository = usersRepository;
            _gitHubLoginService = gitHubLoginService;
            _tokenService = tokenService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            var existingUser = await _usersRepository.GetUserByEmailAsync(user.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            await _usersRepository.CreateUserAsync(user);
            return Ok();
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] User user)
        {
            User existingUser = await _usersRepository.GetUserByEmailAsync(user.Email);
            if (existingUser == null)
            {
                return NotFound("User with this email does not exist");
            }

            // Check if the password is correct
            if (!BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password))
            {
                return BadRequest("Invalid password");
            }

            // If the user exists and the password is correct, return a token
            var token = _tokenService.GenerateToken(existingUser.Email);

            Response.Headers.Append("Authorization", $"Bearer {token}");

            return Ok(new { existingUser.Email, existingUser.Name });
        }

        // [Authorize]
        // [HttpGet]
        // public async Task<IEnumerable<User>> GetAllUsers()
        // {
        //     return await _usersRepository.GetAllUsersAsync();
        // }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return Ok("Logged out successfully");
        }

        [Authorize]
        [HttpGet("me/{email}")]
        public async Task<IActionResult> GetCurrentUser(string email)
        {
            var user = await _usersRepository.GetUserByEmailAsync(email);
            return Ok(new { user.Email, user.Name, user.Photo, user.Bio, user.Phone });
        }

        [Authorize]
        [HttpPut("me")]
        public async Task<IActionResult> UpdateCurrentUser([FromBody] User user)
        {
            var existingUser = await _usersRepository.GetUserByEmailAsync(user.Email);
            if (existingUser == null)
            {
                return NotFound("User with this email does not exist");
            }

            user.Id = existingUser.Id;
            await _usersRepository.UpdateUserAsync(user);
            return Ok();
        }

        [HttpPost("github-signin")]
        public async Task<IActionResult> GitHubSignInAsync([FromBody] string code)
        {
            var token = await _gitHubLoginService.GenerateTokenAsync(code);

            var user = await _gitHubLoginService.GetGitHubUserAsync(token);
            if (user == null)
            {
                return BadRequest("Invalid token");
            }

            var existingUser = await _usersRepository.GetUserByEmailAsync(user.Email);
            if (existingUser == null)
            {
                await _usersRepository.CreateUserAsync(user);
            }

            var jwtToken = _tokenService.GenerateToken(user.Email);
            Response.Headers.Append("Authorization", $"Bearer {jwtToken}");

            return Ok(new { user.Email, user.Name, user.Photo });
        }


    }
}
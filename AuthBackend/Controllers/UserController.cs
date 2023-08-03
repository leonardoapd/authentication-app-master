using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthBackend.DTOs;
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
        public async Task<IActionResult> SignUp([FromBody] UserSignUpDTO userDto)
        {
            var existingUser = await _usersRepository.GetUserByEmailAsync(userDto.Email);

            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            var user = new User
            {
                Email = userDto.Email,
                Password = userDto.Password,
            };

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
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Invalid token");
            }

            // Obtiene el email del usuario desde el token JWT utilizando el método GetEmailFromToken de ITokenService
            var email = _tokenService.GetEmailFromToken(token);

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Invalid token or user not found");
            }

            var user = await _usersRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userResponse = new UserResponseDTO
            {
                Email = user.Email,
                Name = user.Name,
                Photo = user.Photo,
                Bio = user.Bio,
                Phone = user.Phone
            };

            return Ok(userResponse);
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

            if (existingUser.Password is not null && !(BCrypt.Net.BCrypt.Verify(user.Password, existingUser.Password)))
            {
                return BadRequest("Invalid password");
            }

            user.Password = user.Password is not null ? BCrypt.Net.BCrypt.HashPassword(user.Password) : null;
            user.Id = existingUser.Id;
            await _usersRepository.UpdateUserAsync(user);
            return Ok();
        }


        [HttpPost("github-signin")]
        public async Task<IActionResult> GitHubSignInAsync([FromBody] string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return BadRequest("Invalid code");
            }

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

            var responseDto = new GitHubSignInResponseDTO
            {
                Email = user.Email,
                Name = user.Name,
                Photo = user.Photo
            };
            Response.Headers.Append("Authorization", $"Bearer {jwtToken}");

            return Ok(responseDto);
        }


    }
}
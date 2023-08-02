using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthBackend.Entities;

namespace AuthBackend.Services
{
    public interface IGitHubLoginService
    {
        public Task<string> GenerateTokenAsync(string code);
        public Task<User> GetGitHubUserAsync(string token);
    }
}
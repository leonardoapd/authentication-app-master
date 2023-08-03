using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthBackend.Entities;

namespace AuthBackend.Services
{
    public interface ITokenService
    {
        public string GenerateToken(string email);
        public string GetEmailFromToken(string token);
    }
}
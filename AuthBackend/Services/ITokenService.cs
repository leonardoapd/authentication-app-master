using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBackend.Services
{
    public interface ITokenService
    {
        public string GenerateToken(string email);
    }
}
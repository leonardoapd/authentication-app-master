using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBackend.DTOs
{
    public class UserSignUpDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthBackend.DTOs
{
    public class GitHubSignInResponseDTO
    {
        public string? Email { get; set; }
        public string? Name { get; set; }
        public string? Photo { get; set; }
    }
}
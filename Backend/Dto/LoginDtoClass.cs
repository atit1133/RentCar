using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dto
{
    public class LoginDtoClass
    {
        //create dto class for login
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? RememberMe { get; set; } = null; // Nullable to allow for no value
    }
}
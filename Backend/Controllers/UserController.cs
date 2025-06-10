using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;
using Backend.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rentCar.Interfaces;
using rentCar.Models;

namespace rentCar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<User>>> Get() // Add async
        {
            var UserFetch = await _user.GetUser(); // Add await
            if (UserFetch != null)
            {
                return Ok(UserFetch);
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id) // Add async
        {
            var UserFetch = await _user.GetUserById(id); // Add await
            if (UserFetch != null)
            {
                return Ok(UserFetch);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user) // Add async
        {
            var UserFetch = await _user.AddUser(user); // Add await
            if (UserFetch != null)
            {
                return Ok(UserFetch);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] User user) // Add async
        {
            var UserFetch = await _user.UpdateUser(user); // Add await
            if (id != user.UserId)
            {
                return BadRequest("The id in the route and the body are not same");
            }
            else if (UserFetch)
            {
                return Ok(UserFetch);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id) // Add async
        {
            var UserFetch = await _user.DeleteUser(id); // Add await
            if (UserFetch)
            {
                return Ok("User deleted");
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDtoClass user) // Add async
        {            
            //check if email and password are provided
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Email and password are required!");
            }
             var token = await _user.GetUserByEmailAndPassword(user.Email, user.Password); // Assuming this method exists
            if (token != null)
            {
                return Ok(new { token = token}); // Return the token if login is successful
            }
            return Unauthorized("Invalid email or password");
        }

        
    }
}

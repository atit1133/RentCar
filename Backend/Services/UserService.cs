using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; // Add this for async/await
using Microsoft.EntityFrameworkCore;
using rentCar.Data;
using rentCar.Interfaces;
using rentCar.Models;
using BCrypt.Net; //  using BCrypt for password hashing
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens; // Add this for JWT token handling

namespace rentCar.Services
{
    public class UserService : IUser
    {
        private readonly DbContextData _context;
        private readonly IConfiguration _configuration;

        public UserService(DbContextData context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration; // Store the configuration for JWT token generation
        }
      

        public async Task<List<User>> GetUser()
        {
            return await _context.Users.ToListAsync(); // Use ToListAsync()
        }

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id); // Use FindAsync()
        }

        public async Task<User?> AddUser(User user)
        {
            if (user == null)
            {
                return null; // Return null if user is null
            }
            // Hash the password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            try
            {
                await _context.Users.AddAsync(user); // Use AddAsync()
                await _context.SaveChangesAsync(); // Use SaveChangesAsync()
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> UpdateUser(User user)
        {
            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId); // Use FirstOrDefaultAsync()
                if (existingUser == null)
                {
                    return false; // User not found
                }
                _context.Entry(existingUser).CurrentValues.SetValues(user);
                await _context.SaveChangesAsync(); // Use SaveChangesAsync()
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteUser(int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId); // Use FindAsync()
                if (user == null)
                {
                    return false;
                }
                _context.Users.Remove(user);
                await _context.SaveChangesAsync(); // Use SaveChangesAsync()
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<string?> GetUserByEmailAndPassword(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            //Check if user exists and verify password
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                // Optionally, you can generate a JWT token here if needed
                //define a method to generate a token
                // For example:
                // claims, signing credentials, etc.
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                   
                };

                var token =  new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    expires: DateTime.Now.AddMinutes(30),
                    claims: claims, // Add claims if needed
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured."))),
                        SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token); // Return the token as a string
            }
            return null;
        }
    }
}

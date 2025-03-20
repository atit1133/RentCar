using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; // Add this for async/await
using Microsoft.EntityFrameworkCore;
using rentCar.Data;
using rentCar.Interfaces;
using rentCar.Models;

namespace rentCar.Services
{
    public class UserService : IUser
    {
        private readonly DbContextData _context;

        public UserService(DbContextData context)
        {
            _context = context;
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
    }
}

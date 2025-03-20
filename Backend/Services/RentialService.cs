using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rentCar.Interfaces;
using rentCar.Models;
using rentCar.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace rentCar.Services
{
    public class RentialService : IRential
    {
        private readonly DbContextData _context;
        public RentialService(DbContextData context)
        {
            _context = context;
        }

        public async Task<List<Rential>> GetRential()
        {          
            return await _context.Rentials.ToListAsync();                   
        }

        public async Task<Rential?> GetRentilById(int rentialId)
        {
            return await _context.Rentials.FindAsync(rentialId);
        }
        public async Task<Rential?> AddRential(Rential rential)
        {
            try
            {
                await _context.Rentials.AddAsync(rential);
                await _context.SaveChangesAsync();
                return rential;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> UpdateRential(Rential rential)
        {
           try
           {
                var existingRential = await _context.Rentials.FirstOrDefaultAsync(res => res.RentialId == rential.RentialId);
                if(existingRential == null)
                {
                    return false;
                }
                _context.Entry(existingRential).CurrentValues.SetValues(rential);
                await _context.SaveChangesAsync();
                return true;
           }
           catch(Exception)
           {
                return false;
           }
        }
        public async Task<bool> DeleteRential(int id)
        {
            try
            {
                var RentialFetch = await _context.Rentials.FindAsync(id);
                if (RentialFetch == null)
                {
                    return false;
                }
                _context.Rentials.Remove(RentialFetch);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
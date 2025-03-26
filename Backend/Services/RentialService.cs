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

        public async Task<List<Rential>> GetRentilsByCarId(int carId)
        {
            return await _context.Rentials.Where(res => res.CarId == carId).ToListAsync();
        }
        public async Task<Rential?> GetRentilById(int carId)
        {
            return await _context.Rentials.FindAsync(carId);
        }
        public async Task<List<Rential>> GetRentialReportTotalMount()
        {
           // 1. Group by year and month and calculate the sum in the database.
            var monthlyTotals = await _context.Rentials
                .GroupBy(r => new { r.StartDate.Year, r.StartDate.Month })
                .Select(g => new
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    Total = g.Sum(r => r.Total)
                })
                .OrderBy(g => g.Year)
                .ThenBy(g => g.Month)
                .ToListAsync();

            // 2. Determine the range of months to include (e.g., the last 12 months).
            var currentYear = DateTime.Now.Year;
            var currentMonth = DateTime.Now.Month;
            var startYear = currentYear;
            var startMonth = currentMonth - 11; // 12 months ago

            if (startMonth <= 0)
            {
                startYear--;
                startMonth += 12;
            }

            // 3. Create a list of all months within the range.
            var allMonths = new List<(int Year, int Month)>();
            for (int year = startYear; year <= currentYear; year++)
            {
                for (int month = 1; month <= 12; month++)
                {
                    if ((year == startYear && month < startMonth) || (year == currentYear && month > currentMonth))
                    {
                        continue;
                    }
                    allMonths.Add((year, month));
                }
            }

            // 4. Create the Rential objects, including months with no data.
            var result = allMonths.Select(ym =>
            {
                var existingData = monthlyTotals.FirstOrDefault(mt => mt.Year == ym.Year && mt.Month == ym.Month);
                return new Rential
                {
                    StartDate = new DateTime(ym.Year, ym.Month, 1),
                    Total = existingData?.Total ?? 0 // Use the existing total or 0 if no data.
                };
            }).ToList();

            return result;
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
        public async Task<List<Rential>> GetRentialReportTotalCurrentMount(int year, int month)
        {
            return await _context.Rentials.Where(res => res.StartDate.Year == year && res.StartDate.Month == month).ToListAsync();
        }
    }
}

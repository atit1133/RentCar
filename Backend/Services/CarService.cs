using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rentCar.Interfaces;
using rentCar.Models;
using rentCar.Data;
using Microsoft.EntityFrameworkCore;

namespace rentCar.Services
{
    public class CarService : ICar
    {
        private readonly DbContextData _context;
        public CarService(DbContextData context)
        {
            _context = context;
        }

        public async Task<List<Car>> GetCars()
        {
            return await _context.Cars.ToListAsync();
           
        }
        public async Task<Car?> GetCarById(int carId)
        {
           var  car = await _context.Cars.FindAsync(carId);
           return car;
        }

        public async Task<Car?> AddCar(Car car)
        {
            try{
                await _context.Cars.AddAsync(car);
                await _context.SaveChangesAsync();
                return car;
            }catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> UpdateCar(Car car)
        {
            try{
                var existingCar = await _context.Cars.FirstOrDefaultAsync(cars=> cars.CarId == car.CarId);
                if (existingCar == null)
                {
                    return false;
                }
                _context.Entry(existingCar).CurrentValues.SetValues(car);
                await _context.SaveChangesAsync();
                return true;
            }catch (Exception)
            {
                return false;
            }
           
        }

        public async Task<bool> DeleteCar(int carId)
        {
            try{
                var carFetch = await _context.Cars.FindAsync(carId);
                if(carFetch == null)
                {
                    return false;
                }
                _context.Cars.Remove(carFetch);
                await _context.SaveChangesAsync();
                return true;
                
            }catch (Exception)
            {
                return false;
            }
        }
    }
}
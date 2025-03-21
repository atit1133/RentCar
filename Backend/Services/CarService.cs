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

        // public async Task<Car?> AddCar(Car car)
        // {
        //     try{
        //         await _context.Cars.AddAsync(car);
        //         await _context.SaveChangesAsync();
        //         return car;
        //     }catch (Exception)
        //     {
        //         return null;
        //     }
        // }

        public async Task<Car> AddCar(Car car, IFormFile? imageFile)
        {
            try
            {
                if (imageFile != null && imageFile.Length > 0)
                {
                    // Define the folder where the images will be stored
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedImages");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique filename for the uploaded image
                    var uniqueFileName = $"{Guid.NewGuid()}_{imageFile.FileName}";
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the file
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    // Set the file path in the Car object
                    car.Image = $"/UploadedImages/{uniqueFileName}";
                }

                await _context.Cars.AddAsync(car);
                await _context.SaveChangesAsync();
                return car;
            }
            catch (Exception)
            {
                return null;
            }
        }


        // public async Task<bool> UpdateCar(Car car)
        // {
        //     try{
        //         var existingCar = await _context.Cars.FirstOrDefaultAsync(cars=> cars.CarId == car.CarId);
        //         if (existingCar == null)
        //         {
        //             return false;
        //         }
        //         _context.Entry(existingCar).CurrentValues.SetValues(car);
        //         await _context.SaveChangesAsync();
        //         return true;
        //     }catch (Exception)
        //     {
        //         return false;
        //     }
           
        // }
        public async Task<bool> UpdateCar(Car car, IFormFile? imageFile)
        {
            try
            {
                var existingCar = await _context.Cars.FirstOrDefaultAsync(c => c.CarId == car.CarId);
                if (existingCar == null)
                {
                    return false;
                }

                if (imageFile != null && imageFile.Length > 0)
                {
                    // Define the folder where the images will be stored
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedImages");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    // Generate a unique filename for the uploaded image
                    var uniqueFileName = $"{Guid.NewGuid()}_{imageFile.FileName}";
                    var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                    // Save the file
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    // Update the file path in the Car object
                    existingCar.Image = $"/UploadedImages/{uniqueFileName}";
                }

                // Update other car details
                _context.Entry(existingCar).CurrentValues.SetValues(car);

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
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

        public Task<Car?> AddCar(Car car)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateCar(Car car)
        {
            throw new NotImplementedException();
        }
    }
}
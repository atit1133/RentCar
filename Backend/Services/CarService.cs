using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using rentCar.Data;
using rentCar.Interfaces;
using rentCar.Models;

namespace rentCar.Services
{
    public class CarService : ICar
    {
        private readonly DbContextData _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CarService(DbContextData context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<Car>> GetCars()
        {
            return await _context.Cars.ToListAsync();
        }

        public async Task<Car?> GetCarById(int carId)
        {
            return await _context.Cars.FindAsync(carId);
        }

        public async Task<Car> AddCar(Car car, IFormFile? imageFile)
        {
            try
            {
                if (imageFile != null && imageFile.Length > 0)
                {
                    car.Image = await SaveImageAsync(imageFile);
                }

                await _context.Cars.AddAsync(car);
                await _context.SaveChangesAsync();
                return car;
            }
            catch (Exception ex)
            {
                throw new Exception("Error adding car: " + ex.Message);
            }
        }

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
                    // Delete old image before saving a new one
                    if (!string.IsNullOrEmpty(existingCar.Image))
                    {
                        DeleteImage(existingCar.Image);
                    }

                    existingCar.Image = await SaveImageAsync(imageFile);
                }

                _context.Entry(existingCar).CurrentValues.SetValues(car);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error updating car: " + ex.Message);
            }
        }

        public async Task<bool> DeleteCar(int carId)
        {
            try
            {
                var car = await _context.Cars.FindAsync(carId);
                if (car == null)
                {
                    return false;
                }

                // Delete the car's image from storage
                if (!string.IsNullOrEmpty(car.Image))
                {
                    DeleteImage(car.Image);
                }

                _context.Cars.Remove(car);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error deleting car: " + ex.Message);
            }
        }

        // 👇 Helper method to save image
        private async Task<string> SaveImageAsync(IFormFile imageFile)
        {
            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploadimages");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            return $"/uploadimages/{uniqueFileName}"; // Relative path for serving via static files
        }

        // 👇 Helper method to delete an image
        private void DeleteImage(string imagePath)
        {
            string fullPath = Path.Combine(_webHostEnvironment.WebRootPath, imagePath.TrimStart('/'));

            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }
}

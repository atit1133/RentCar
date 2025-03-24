using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rentCar.Models;
using Microsoft.AspNetCore.Http;

namespace rentCar.Interfaces
{
    public interface ICar
    {
         Task<List<Car>> GetCars();
         Task<Car?> GetCarById(int carId);
        //  Task<Car?> AddCar(Car car);
         Task<Car> AddCar(Car car, IFormFile? imageFile);
         Task<bool> UpdateCar(Car car, IFormFile? imageFile);
         Task<bool> DeleteCar(int carId);
    }
}
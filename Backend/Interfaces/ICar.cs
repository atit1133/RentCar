using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rentCar.Models;

namespace rentCar.Interfaces
{
    public interface ICar
    {
         Task<List<Car>> GetCars();
         Task<Car?> GetCarById(int carId);
         Task<Car?> AddCar(Car car);
         Task<bool> UpdateCar(Car car);
         Task<bool> DeleteCar(int carId);
    }
}
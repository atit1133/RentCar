using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using rentCar.Interfaces;
using rentCar.Models;

namespace rentCar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : Controller
    {
        private readonly ICar _car;   
        public CarController(ICar car)
        {
            _car = car;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<Car>>> Get()
        {
            var cars = await _car.GetCars();
            if (cars == null)
            {
                return NotFound();
            }
            return Ok(cars);
            
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(int id)
        {
            var car = await _car.GetCarById(id);
            if (car == null)
            {
                return NotFound();
            }
            return Ok(car);
        }

        [HttpPost]
        public async Task<ActionResult<Car>> Post([FromBody] Car car)
        {
            var newCar = await _car.AddCar(car);
            if (newCar == null)
            {
                return BadRequest();
            }
            return Ok(newCar);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] Car car)
        {
            var updatedCar = await _car.UpdateCar(car);
            if (id != car.CarId)
            {
                return BadRequest("The id in the route and the body are not same");
            }else if (!updatedCar)
            {
                return NotFound();
            }
            return Ok(updatedCar);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var result = await _car.DeleteCar(id);
            if (result)
            {
                return Ok("Car has been deleted");
            }
            return NotFound();
        }
    }
}
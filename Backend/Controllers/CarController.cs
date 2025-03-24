using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CarController(ICar car, IWebHostEnvironment webHostEnvironment)
        {
            _car = car;
            _webHostEnvironment = webHostEnvironment;
            
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
        public async Task<ActionResult> AddCar([FromForm] Car car, [FromForm] IFormFile? image)
        {
            try
            {
                // Log the received car object and image file for debugging
                Console.WriteLine($"Car is: {System.Text.Json.JsonSerializer.Serialize(car)}");
                Console.WriteLine($"Image is: {image?.FileName ?? "No image uploaded"}");

                // Validate the car object
                if (car == null || string.IsNullOrEmpty(car.Brand) || car.Year <= 0)
                {
                    return BadRequest("Invalid car data.");
                }

                // Call the service/repository method to save the car and image
                var result = await _car.AddCar(car, image);
                if (result == null)
                {
                    return BadRequest(new { Message = "Failed to add car." });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while adding the car.", Error = ex.Message });
            }
        }



        // [HttpPost]
        // public async Task<ActionResult<Car>> Post([FromBody] Car car)
        // {
        //     var newCar = await _car.AddCar(car);
        //     if (newCar == null)
        //     {
        //         return BadRequest();
        //     }
        //     return Ok(newCar);
        // }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] Car car, [FromForm] IFormFile? imageFile)
        {
            var updatedCar = await _car.UpdateCar(car, imageFile);
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
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using rentCar.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks; // Correct


namespace rentCar.Controllers
{
    [Route("api/[controller]")]
    public class CheckConnection : Controller
    {
        private readonly DbContextData _context;


        public CheckConnection(DbContextData context)
        {
            _context = context;
        }

        [HttpGet("Check")]
        public async Task<IActionResult> Check()
        {
        try
        {
            if ( await _context.Database.CanConnectAsync())
            {
                return Ok("Database connection successful!");
            }
            else
            {
                return StatusCode(500, "Database connection failed!");
            }
            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Database connection failed: {ex.Message}");
        }
        finally
        {
            _context.Database.CloseConnection();
        }
    }

    }
}

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
    public class RentialController : Controller
    {
        private readonly IRential _rential;

        public RentialController(IRential rential)
        {
            _rential = rential;
        }        

        [HttpGet]
        public async Task<ActionResult<List<Rential>>> Get()
        {
            var rentials = await _rential.GetRential();
            return Ok(rentials);
            
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Rential>> Get(int id)
        {
            var CarFetch = await _rential.GetRentilById(id);
            if(CarFetch != null){
                return Ok(CarFetch);
            }
            return NotFound();
        }
        [HttpPost]
        public async Task<ActionResult<Rential>> Post([FromBody] Rential rential)
        {
            var AddCar = await _rential.AddRential(rential);
            return Ok(AddCar);
        }
        
        [HttpPut("{id}")]
        public async  Task<ActionResult<bool>> Put(int id, [FromBody] Rential rential)
         {
           if(id != rential.RentialId){
             return BadRequest("The id in the route and the body are not same");
           }
           return await _rential.UpdateRential(rential);
        }
        [HttpDelete("{id}")]
        public async  Task<ActionResult<bool>>  Delete(int id)
        {
            var DeleteCar = await _rential.DeleteRential(id);
            if(DeleteCar){
                return Ok("Rential deleted");
            }
            return NotFound();
        }  
    }
}
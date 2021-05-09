using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using API.Models;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExistTimeController : ControllerBase
    {

        private readonly DatabaseContext _context;

        public ExistTimeController(DatabaseContext context)
        {
            _context = context;
        }


        // GET: api/<ExistTimeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExistTime>>> GetExistTimes()
        {

            return await _context.existTimes.ToListAsync();

        }

        [HttpGet("{mobile}")]
        public ActionResult<IEnumerable<ExistTime>> GetExistTimeByNum(string mobile)
        {
            var result = _context.existTimes.Where(x => x.Doctor == mobile).ToList();
            return Ok(result);

        }

        // POST api/<ExistTimeController>
        [HttpPost]
        public async Task<ActionResult<User>> PostExistTime(ExistTime existTime)
        {
            _context.existTimes.Add(existTime);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = existTime.ID }, existTime);
        }

        // PUT api/<ExistTimeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ExistTimeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

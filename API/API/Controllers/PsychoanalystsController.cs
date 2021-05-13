using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Context;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PsychoanalystsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PsychoanalystsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Psychoanalysts
        //[HttpGet("{Patients}")]
        //public async Task<ActionResult<IEnumerable<Calendar>>> Getpsychoanalysts()
        //{
        //    return await _context.calendars.ToListAsync();
           
        //}

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Psychoanalyst>>> Getpsychoanalysts()
        {
            return await _context.psychoanalysts.ToListAsync();
        }

        //// GET: api/Psychoanalysts/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Psychoanalyst>> GetPsychoanalyst(int id)
        //{
        //    var psychoanalyst = await _context.psychoanalysts.FindAsync(id);

        //    if (psychoanalyst == null)
        //    {
        //        return NotFound();
        //    }

        //    return psychoanalyst;
        //}

        //[HttpGet("{mobile}")]
        //public async Task<ActionResult<IEnumerable<Patient>>> GetPatientByNum(string mobile)
        //{
        //    var result = await _context.psychoanalysts.Where(x => x.Phone == mobile).ToListAsync();
        //    return Ok(result);

        //}


        // PUT: api/Psychoanalysts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPsychoanalyst(int id, Psychoanalyst psychoanalyst)
        {
            if (id != psychoanalyst.ID)
            {
                return BadRequest();
            }

            _context.Entry(psychoanalyst).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PsychoanalystExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Psychoanalysts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Psychoanalyst>> PostPsychoanalyst(Psychoanalyst psychoanalyst)
        {
            _context.psychoanalysts.Add(psychoanalyst);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPsychoanalyst", new { id = psychoanalyst.ID }, psychoanalyst);
        }

        // DELETE: api/Psychoanalysts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Psychoanalyst>> DeletePsychoanalyst(int id)
        {
            var psychoanalyst = await _context.psychoanalysts.FindAsync(id);
            if (psychoanalyst == null)
            {
                return NotFound();
            }

            _context.psychoanalysts.Remove(psychoanalyst);
            await _context.SaveChangesAsync();

            return psychoanalyst;
        }

        private bool PsychoanalystExists(int id)
        {
            return _context.psychoanalysts.Any(e => e.ID == id);
        }



    }
}

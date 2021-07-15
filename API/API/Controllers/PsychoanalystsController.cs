using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Context;
using API.Models;
using Microsoft.AspNetCore.Cors;

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



        [HttpGet]
        public async Task<ActionResult<IEnumerable<Psychoanalyst>>> Getpsychoanalysts()
        {
            return await _context.psychoanalysts.ToListAsync();
        }


        [HttpGet("{mobile}")]
        public async Task<ActionResult<IEnumerable<Psychoanalyst>>> GetPatientByNum(string mobile)
        {
            var result = await _context.psychoanalysts.Where(x => x.Phone == mobile).ToListAsync();
            return Ok(result);

        }


        [HttpGet("id/{id}")]
        public async Task<ActionResult<IEnumerable<Psychoanalyst>>> GetPatientById(int id)
        {
            var result = await _context.psychoanalysts.Where(x => x.ID == id).ToListAsync();
            return Ok(result);

        }

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

     
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Psychoanalyst>>> SavePsychoanalyst(Psychoanalyst psychoanalyst)
        {
            _context.psychoanalysts.Add(psychoanalyst);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetPsychoanalysts", new { id = psychoanalyst.ID }, psychoanalyst);
            return Ok();
        }

        
      
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

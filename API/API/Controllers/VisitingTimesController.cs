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
    public class VisitingTimesController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public VisitingTimesController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitingTime>>> GetvisitingTimes()
        {
            return await _context.visitingTimes.ToListAsync();
        }

        [HttpGet("{psychoanalustId}/{weekday}")]
        public async Task<ActionResult<IEnumerable<VisitingTime>>> GetVisitingTimeByNum(int psychoanalustId, string weekday)
        {
            var psychoanalyst = await _context.visitingTimes.Where(x => x.PsychoanalystId == psychoanalustId).ToListAsync();
            var week = psychoanalyst.Where(x => x.WeekDays == weekday).ToList();


            return Ok(week);



        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVisitingTime(int id, VisitingTime visitingTime)
        {
            if (id != visitingTime.ID)
            {
                return BadRequest();
            }

            _context.Entry(visitingTime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VisitingTimeExists(id))
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
        public async Task<ActionResult<VisitingTime>> PostVisitingTime(VisitingTime visitingTime)
        {
            _context.visitingTimes.Add(visitingTime);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvisitingTimes", new { id = visitingTime.ID }, visitingTime);
        }

        [HttpGet("{psychoanalustId}/{weekday}/{starttime}")]
        public async Task<ActionResult<IEnumerable<VisitingTime>>> DeleteVisitingTimeByNum(int psychoanalustId, string starttime, string weekday)
        {
            var psychoanalyst = await _context.visitingTimes.Where(x => x.PsychoanalystId == psychoanalustId).ToListAsync();
            var week = psychoanalyst.Where(x => x.WeekDays == weekday).ToList();
            var time = week.Where(x => x.StartTime == starttime).FirstOrDefault();

            return Ok(time);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVsitingTime(int id)
        {
            var visitingtime = await _context.visitingTimes.FindAsync(id);
            if (visitingtime == null)
            {
                return NotFound();
            }

            _context.visitingTimes.Remove(visitingtime);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool VisitingTimeExists(int id)
        {
            return _context.visitingTimes.Any(e => e.ID == id);
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Context;
using API.Models;
using Microsoft.AspNetCore.Cors;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PatientsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("{Calendar}/{pyschoanalystId}")]
        public async Task<ActionResult<IEnumerable<Models.Calendar>>> GetCalendar(int pyschoanalystId)
        {
            var result = _context.calendars.Where(q => q.PsychoanalystId  == pyschoanalystId).ToList();
            return Ok(result);
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            // return await _context.psychoanalysts.ToListAsync();
            var Calendars = await _context.calendars.Where(q => q.PsychoanalystId == 2).ToListAsync();
            var Patients = await _context.patients.ToListAsync();
            var Psychonalyst = await _context.patients.ToListAsync();

            var query = from Calendar in Calendars
                        join Patient in Patients on Calendar.PatientId equals Patient.Id into JoinResaults
                        from JoinResult in JoinResaults.DefaultIfEmpty()
                        select new { Calendar, PatientName = JoinResult?.Name ?? String.Empty, PatientLastName = JoinResult?.LastName ?? String.Empty };

            return Ok(query);
        }

        [HttpPost("saveCalendar")]
        public async Task<ActionResult<IEnumerable<Models.Calendar>>> SaveCalendar(Models.Calendar calendar)
        {
            _context.calendars.Add(calendar);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetCalendar", new { id = calendar.Id }, calendar);
            return Ok();
        }

        [HttpPost("savePatient")]
        public async Task<ActionResult<Patient>> SavePatient()
        {
            var patient = new Patient();
            _context.patients.Add(patient);
            _context.SaveChanges();
            return Ok(patient);
            
        }


        //[HttpGet("{mobile}"), Authorize]
        //public async Task<ActionResult<IEnumerable<Patient>>> GetPatientByNum(string mobile)
        //{
        //    var result = await _context.patients.Where(x => x.Doctor == mobile).ToListAsync();
        //    return Ok(result);

        //}

        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.patients.Add(patient);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
            return Ok(patient.Id);
        }


        //DELETE: api/Patients/5

        [HttpDelete("{id}")]
        public async Task<ActionResult<Patient>> DeletePatient(int id)
        {
            var patient = await _context.patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.patients.Remove(patient);
            await _context.SaveChangesAsync();

            return patient;
        }

        private bool PatientExists(int id)
        {
            return _context.patients.Any(e => e.Id == id);
        }
    }


}

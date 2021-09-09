using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Controllers
{
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly drkh_databaseContext _context;

        public PatientsController(drkh_databaseContext context)
        {
            _context = context;
        }


        //"{Calendar}/{pyschoanalystId}"
        //[HttpGet]
        //[Route("{Calendar}/{pyschoanalystId}")]
        //public async Task<ActionResult<IEnumerable<Models.calendars>>> GetCalendar(int pyschoanalystId)
        //{
        //    var result = _context.calendars.Where(q => q.PsychoanalystId == pyschoanalystId).ToList();
        //    return Ok(result);
        //}

        //[HttpGet("reservedTime/{id}")]
        //public async Task<ActionResult> GetPatientReservedTime(int id)
        //{
        //    var result = await _context.ViewPatientInfo.Where(q => q.PatientId == id).ToListAsync();
        //    return Ok(result);
        //}

        [HttpGet]
        [Route("api/checkPatient/{mobile}")]
        public async Task<ActionResult> CheckPatient(string mobile)
        {
            var result =  _context.Patients.SingleOrDefault(q => q.Mobile == mobile);
            if (result == null)
            {
                return Ok(new DataResponse()
                {
                    IsSuccess = true
                });
            }
            else
            {
                return Ok(new DataResponse()
                {
                    IsSuccess = false
                });

            }
        }


        //[HttpGet("{Id}")]
        //public async Task<ActionResult<IEnumerable<Patient>>> GetPatients(int Id)
        //{
        //    var Calendars = await _context.calendars.Where(q => q.PsychoanalystId == Id).ToListAsync();
        //    var Patients = await _context.patients.ToListAsync();
        //    var Psychonalyst = await _context.patients.ToListAsync();

        //    var query = from Calendar in Calendars
        //                join Patient in Patients on Calendar.PatientId equals Patient.Id into JoinResaults
        //                from JoinResult in JoinResaults.DefaultIfEmpty()
        //                select new { Calendar, Name = JoinResult?.Name ?? String.Empty, LastName = JoinResult?.LastName ?? String.Empty, Mobile = JoinResult?.Mobile ?? String.Empty, Subject = JoinResult?.Subject ?? String.Empty, Reason = JoinResult?.Reason ?? String.Empty, Email = JoinResult?.Email ?? String.Empty, MaritalStatus = JoinResult?.MaritalStatus ?? String.Empty, Age = JoinResult?.Age ?? String.Empty, ChildrenNum = JoinResult?.ChildrenNum ?? String.Empty, Introduced = JoinResult?.Introduced ?? String.Empty, Education = JoinResult?.Education ?? String.Empty, Job = JoinResult?.Job ?? String.Empty, FieldOfStudy = JoinResult?.FieldOfStudy ?? String.Empty};

        //    return Ok(query);
        //}

        [HttpGet]
        [Route("api/getpatient/{Id}")]
        public async Task<ActionResult<IEnumerable<Models.calendars>>> GetPatients(int Id)
        {
            var Calendars = await _context.calendars.Where(q => q.PsychoanalystId == Id).ToListAsync();
            var Patients = await _context.Patients.ToListAsync();
            var Psychonalyst = await _context.Patients.ToListAsync();

            var query = from Calendar in Calendars
                        join Patient in Patients on Calendar.PatientId equals Patient.Id into JoinResaults
                        from JoinResult in JoinResaults.DefaultIfEmpty()
                        select new { Calendar, Name = JoinResult?.Name ?? String.Empty, LastName = JoinResult?.LastName ?? String.Empty, Mobile = JoinResult?.Mobile ?? String.Empty, Subject = JoinResult?.Subject ?? String.Empty, Reason = JoinResult?.Reason ?? String.Empty, Email = JoinResult?.Email ?? String.Empty, MaritalStatus = JoinResult?.MaritalStatus ?? String.Empty, Age = JoinResult?.Age ?? String.Empty, ChildrenNum = JoinResult?.ChildrenNum ?? String.Empty, Introduced = JoinResult?.Introduced ?? String.Empty, Education = JoinResult?.Education ?? String.Empty, Job = JoinResult?.Job ?? String.Empty, FieldOfStudy = JoinResult?.FieldOfStudy ?? String.Empty };

            return Ok(query);
        }

        [HttpPost]
        [Route("api/calendar/save")]
        public async Task<ActionResult> SaveCalendar(calendars calendar)
        {
            _context.calendars.Add(calendar);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetCalendar", new { id = calendar.Id }, calendar);
            return Ok(calendar.Id);
        }

        //[HttpPost]
        //[Route("api/patient/save")]
        //public async Task<ActionResult<Patients>> SavePatient()
        //{
        //    var patient = new Patients();
        //    _context.Patients.Add(patient);
        //    _context.SaveChanges();
        //    return Ok(patient);

        //}



        [HttpGet]
        [Route("api/patient/times/{mobile}")]
        public async Task<ActionResult> GetPatientByNum(string mobile)
        {
            var result = await _context.ViewPatientInfo.Where(x => x.PatientMobile == mobile).ToListAsync();
            return Ok(result);

        }

        [HttpGet]
        [Route("api/patient/info/{mobile}")]
        public async Task<ActionResult> GetPatientInfoByNum(string mobile)
        {
            var result = await _context.Patients.Where(x => x.Mobile == mobile).ToListAsync();
            return Ok(result);

        }

        [HttpPost]
        [Route("api/patient/save")]
        public async Task<ActionResult<Patients>> PostPatient(Patients patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
            return Ok(patient.Id);
        }


        //DELETE: api/Patients/5

        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Patients>> DeletePatient(int id)
        //{
        //    var patient = await _context.Patients.FindAsync(id);
        //    if (patient == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Patients.Remove(patient);
        //    await _context.SaveChangesAsync();

        //    return patient;
        //}

        [HttpPost]
        [Route("api/Patients/edit")]
        public async Task<DataResponse> editPatientData(Patients dto)
        {
            var entity = await _context.Patients.SingleOrDefaultAsync(q => q.Id == dto.Id);
            if (entity == null)
            {
                entity = new Patients();
                _context.Patients.Add(entity);
            }

            entity.Name = dto.Name;
            entity.LastName = dto.LastName;
            entity.Mobile = dto.Mobile;
            entity.Subject = dto.Subject;
            entity.Reason = dto.Reason;
            entity.Email = dto.Email;
            entity.MaritalStatus = dto.MaritalStatus;
            entity.Age = dto.Age;
            entity.ChildrenNum = dto.ChildrenNum;
            entity.Introduced = dto.Introduced;
            entity.Education = dto.Education;
            entity.Job = dto.Job;
            entity.FieldOfStudy = dto.FieldOfStudy;

            var saveResult = await _context.SaveAsync();
            if (saveResult.Succeed)
                return new DataResponse()
                {
                    IsSuccess = true,
                    Data = entity
                };
            else
                return new DataResponse() { IsSuccess = false };

        }

      
    }


}

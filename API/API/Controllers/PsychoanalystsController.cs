using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Cors;
using API.ViewModel;
using System.Globalization;
using API.Objects;
using Microsoft.Data.SqlClient;
using System.Data;

namespace API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class PsychoanalystsController : ControllerBase
    {
        private readonly drkh_databaseContext _context;

        public PsychoanalystsController(drkh_databaseContext context)
        {
            _context = context;
        }



        [HttpGet]
        [Route("api/psychoanalyst/get")]
        public async Task<ActionResult<IEnumerable<psychoanalysts>>> Getpsychoanalysts()
        {
            return await _context.psychoanalysts.ToListAsync();
        }


        [HttpPost]
        [Route("api/availabetime/save")]
        public async Task<DataResponse> SaveAvailableTime(AvailableTimeViewModel availableTime)
        {
            TimeSpan StartTime = TimeSpan.Parse(availableTime.StartTime);
            TimeSpan EndTime = TimeSpan.Parse(availableTime.EndTime);

            //var DateTimeId = await _context.DateTable.SingleOrDefaultAsync(q => q.PDate == availableTime.PDate);
            var check = await _context.availableTime.FirstOrDefaultAsync(q => (q.StartTime == StartTime || q.EndTime == EndTime || (StartTime > q.StartTime && StartTime < q.EndTime) || (EndTime > q.StartTime && EndTime < q.EndTime)) && q.DateId == availableTime.DateId && q.PsychoanalystId == availableTime.PsychoanalystId);
            var entity = await _context.availableTime.SingleOrDefaultAsync(q => q.Id == availableTime.Id);
            if (check == null)
            {

                if (entity == null)
                {
                    entity = new availableTime();
                    _context.availableTime.Add(entity);
                }
                entity.PsychoanalystId = availableTime.PsychoanalystId;
                entity.DateId = availableTime.DateId;
                entity.StartTime = StartTime;
                entity.EndTime = EndTime;
                entity.DateConfirmed = availableTime.DateConfirmed;
                entity.PatientId = availableTime.PatientId;

                var saveResult = await _context.SaveAsync();
                if (saveResult.Succeed)
                    return new DataResponse()
                    {
                        IsSuccess = true,
                        Data = entity
                    };
                else
                {
                    return new DataResponse() { IsSuccess = false };
                }

            }
            else
            {
                return new DataResponse() { IsSuccess = false };
            }


        }


        [HttpGet]
        [Route("api/confirmdate/{id}")]
        public async Task<DataResponse> checkConfirmDate(int id)
        {

            var result = _context.availableTime.SingleOrDefault(x => x.Id == id);
            if (result.DateConfirmed == 1 || result.DateConfirmed == 2)
            {
                return new DataResponse()
                {
                    IsSuccess = false
                };
            }
            else
            {
                return new DataResponse()
                {
                    IsSuccess = true
                };
            }
        }

        //"available/{id}/{year}/{month}"
        //[HttpGet("available/{id}/{year}/{month}")]
        //[Route("api/")]
        //public async Task<ActionResult> GetDoctorByIdGrouped(int id, int year, int month)
        //{
        //    try
        //    {
        //        var result = await _context.ViewAvailableTime.Where(y => y.PsychoanalystId == id && y.PYear >= year && y.PMonth == month).ToListAsync();
        //        var grouped = (from y in result

        //                       group y by new { y.PsychoanalystId, y.PDate, y.PDayName, y.PMonth, y.PMonthName, y.Name, y.PYear, y.DateId, y.GDate } into grp
        //                       select new
        //                       {

        //                           grp.Key.PsychoanalystId,
        //                           grp.Key.PDate,
        //                           grp.Key.DateId,
        //                           grp.Key.PDayName,
        //                           grp.Key.PMonth,
        //                           grp.Key.PMonthName,
        //                           grp.Key.Name,
        //                           grp.Key.PYear,
        //                           grp.Key.GDate,
        //                           Items = grp.OrderBy(q => q.StartTime).Select(q => new
        //                           {
        //                               //  q.StartTime,
        //                               //  q.EndTime,
        //                               q.Start,
        //                               q.End,
        //                               q.DateConfirmed,
        //                               q.Id,
        //                               q.PatientId

        //                           }).ToList()


        //                       }).OrderBy(q => q.PDate).ToList();

        //        return Ok(grouped);
        //    }
        //    catch (Exception ex)
        //    {
        //        int i = 0;
        //        return Ok(true);
        //    }

        //}

        //[HttpGet("unAvailable/{id}/{year}/{month}")]
        //public async Task<ActionResult> GetUnAvailable(int id, int year, int month)
        //{

        //    //List<DateTable> result = new List<DateTable>();
        //    List<int> dateIds = new List<int>();
        //    var AvailableTime = await _context.ViewAvailableTime.Where(y => y.PsychoanalystId == id && y.PYear >= year && y.PMonth == month).ToListAsync();
        //    var availableTimeIds = AvailableTime.Select(q => q.DateId).ToList();
        //    var dateTable = await _context.DateTable.Where(y => y.PYear == year && y.PMonth == month).ToListAsync();
        //    dateTable = dateTable.Where(q => !availableTimeIds.Contains(q.Id)).ToList();



        //    return Ok(dateTable);
        //}



        //[HttpGet("getMonths/{id}/{year}")]
        //public async Task<IActionResult> GetMonths(int id, int year)
        //{

        //    //SqlConnection conn = new SqlConnection(@"Data Source=185.141.132.14;Initial Catalog=drkh_database;Integrated Security=false;User ID=drkh_database;Password=Sepehr1234@;");
        //    //SqlCommand cmd = new SqlCommand("SELECT * FROM drkh_database.GetMonths(@psychoId)", conn);
        //    //// cmd.CommandType=CommandType.StoredProcedure;  
        //    //cmd.Parameters.AddWithValue("@psychoId", id);
        //    //SqlDataAdapter da = new SqlDataAdapter(cmd);
        //    //GetMonthsViewModel dt = new GetMonthsViewModel();

        //    //da.Fill(dt);
        //    //string str = da.ToString();
        //    //return Ok(str);
        //}

        [HttpGet]
        [Route("api/getmonths/{id}/{year}")]
        public async Task<ActionResult> GetMonths(int id, int year)
        {
            var entity = await _context.ViewPsychoanalystMonths.Where(y => y.Id == id && y.Pyear == year).OrderBy(y => y.PMonth).ToListAsync();
            return Ok(entity);
        }

        //[HttpGet("availableMonth/{id}/{dtfrom}/{dtto}")]
        //public async Task<ActionResult> GetMonthByDoctorIdGroup(int id, DateTime dtfrom, DateTime dtto)
        //{
        //    try
        //    {
        //        var result = await _context.ViewAvailableTime.Where(y => y.PsychoanalystId == id && y.GDate >= dtfrom && y.GDate <= dtto).ToListAsync();
        //        var grouped = (from y in result
        //                       group y by new { y.PsychoanalystId, y.PMonth, y.PMonthName, y.Name, y.PYear } into grp
        //                       select new
        //                       {

        //                           grp.Key.PsychoanalystId,
        //                           //grp.Key.PDate,
        //                           //grp.Key.DateId,
        //                           //grp.Key.PDayName,
        //                           grp.Key.PMonth,
        //                           grp.Key.PMonthName,
        //                           grp.Key.Name,
        //                           grp.Key.PYear,
        //                           //grp.Key.GDate,
        //                           Items = grp.OrderBy(q => q.PDay).Select(q => new
        //                           {
        //                               //  q.StartTime,
        //                               //  q.EndTime,
        //                               //q.Start,
        //                               //q.End,
        //                               //q.DateConfirmed,
        //                               //q.Id,
        //                               //q.PatientId,
        //                               q.PDate,
        //                               q.DateId,
        //                               q.PDayName,
        //                               q.GDate
        //                           }).ToList()


        //                       }).OrderBy(q => q.PMonth).ToList();
        //        // var result = await query.OrderBy(q => q.PDate).ToListAsync();

        //        return Ok(grouped);
        //    }
        //    catch (Exception ex)
        //    {
        //        int i = 0;
        //        return Ok(true);
        //    }

        //}


        [HttpGet]
        [Route("api/days/{id}/{PYear}/{PMonth}")]
        public async Task<ActionResult> GetDays(int id, int PYear, int PMonth)
        {
            var result = await _context.ViewDateTable.Where(y => y.PMonth == PMonth && y.PYear == PYear && (y.PsychoanalystId == id || y.PsychoanalystId == null)).OrderBy(q => q.Id).ToListAsync();
            return Ok(result);

        }

        [HttpGet]
        [Route("api/times/{id}/{DateId}")]
        public async Task<ActionResult> GetTimes(int id, int DateId, int PMonth)
        {
            var result = await _context.ViewAvailableTime.Where(y => y.DateId == DateId && y.PsychoanalystId == id).OrderBy(q => q.StartTime).ToListAsync();
            return Ok(result);

        }



        //"doctorPatients/{mobile}"
        [HttpGet]
        [Route("api/getdoctorPatients/{mobile}")]
        public async Task<ActionResult> GetDoctorPatients(string mobile)
        {
            var result = await _context.ViewPatientInfo.Where(q => q.psychoanalystMobile == mobile).ToListAsync();
            return Ok(result);
        }


        [HttpGet]
        [Route("api/psychoanalyst/{id}")]
        public async Task<ActionResult> GetPatientById(int id)
        {
            var result = await _context.psychoanalysts.Where(x => x.Id == id).ToListAsync();
            return Ok(result);

        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPsychoanalyst(int id, psychoanalysts psychoanalyst)
        //{
        //    if (id != psychoanalyst.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(psychoanalyst).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PsychoanalystExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}
        //AvailableTime/Update/ConfirmDate
        [HttpPost]
        [Route("api/confirmdate/update")]
        public async Task<IActionResult> editConfirmedDate(AvailableTimeDateConfirmViewModel dto)
        {
            //int id = Convert.ToInt32(dto.Id);
            var result = _context.availableTime.SingleOrDefault(x => x.Id == dto.Id);
            if (result.DateConfirmed == 1 || result.DateConfirmed == 2)
            {
                return base.Ok(new Objects.DataResponse()
                {
                    IsSuccess = true,
                    Data = null,
                });
            }
            else
            {
                var entity = await _context.availableTime.SingleAsync(q => q.Id == dto.Id);
                entity.DateConfirmed = 1;
                entity.PatientId = dto.PatientId;
                await _context.SaveChangesAsync();
                return base.Ok(new Objects.DataResponse()
                {
                    IsSuccess = true,
                    Data = entity.Id,
                });
            }





        }

        [HttpPost]
        [Route("api/psychoanalyst/save")]
        public async Task<DataResponse> SavePsychoanalyst(psychoanalysts psy)
        {

            var entity = await _context.psychoanalysts.SingleOrDefaultAsync(q => q.Id == psy.Id);
            if (entity == null)
            {
                entity = new psychoanalysts();
                _context.psychoanalysts.Add(entity);
            }

            entity.Name = psy.Name;
            entity.LastName = psy.LastName;
            entity.Phone = psy.Phone;
            entity.WeekDays = psy.WeekDays;
            entity.ImageUrl = psy.ImageUrl;
            entity.About = psy.About;
            entity.Sex = psy.Sex;
            entity.Expertise = psy.Expertise;

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



        //[HttpDelete("{id}")]
        //public async Task<ActionResult<psychoanalysts>> DeletePsychoanalyst(int id)
        //{
        //    var psychoanalyst = await _context.psychoanalysts.FindAsync(id);
        //    if (psychoanalyst == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.psychoanalysts.Remove(psychoanalyst);
        //    await _context.SaveChangesAsync();

        //    return psychoanalyst;
        //}

        private bool PsychoanalystExists(int id)
        {
            return _context.psychoanalysts.Any(e => e.Id == id);
        }





    }
}

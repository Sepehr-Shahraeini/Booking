using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authorization;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace API.Controllers
{

    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly drkh_databaseContext _context;

        public AuthController(drkh_databaseContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("api/user/login")]
        public IActionResult Login([FromBody] users user)
        {

            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return null;

            var resault = _context.users.SingleOrDefault(x => x.UserName == user.UserName);

            // check if username exists
            if (user == null)
                return null;


            // var pass = _context.users.SingleOrDefault(x => x.Password == user.Password);

            //check if username exists
            if (resault.Password != user.Password)
                return null;


            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                //issuer: "http://localhost:8088",
                //audience: "http://localhost:8088",
                issuer: "https://dr-khodabakhsh.ir",
                audience: "https://dr-khodabakhsh.ir",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });

        }

        [HttpPost]
        [Route("api/patient/login")]
        public async Task<IActionResult> LoginPatient([FromBody] users user)
        {

            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return null;

            var resault = _context.users.SingleOrDefault(q => q.UserName == user.UserName);
            var patientData = await _context.Patients.Where(q => q.Mobile == user.UserName).ToListAsync();


            // check if username exists
            if (user == null)
                return null;


            //var pass = _context.users.SingleOrDefault(x => x.Password == user.Password);

            //check if username exists
            if (resault.Password != user.Password)
                return null;



            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://dr-khodabakhsh.ir",
                audience: "https://dr-khodabakhsh.ir",
                //issuer: "http://localhost:8080",
                //audience: "http://localhost:8080",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString, patientData });

        }



        // GET: api/Users
        //[HttpGet, Authorize]
        //[Route("api/user/get")]
        //public IEnumerable<users> Getusers()
        //{
        //    return _context.users.ToList();
        //}

        // GET: api/Users/username
        [HttpGet]
        [Route("api/user/get/{username}")]
        public ActionResult<users> Getuser(string username)
        {
            var result = _context.users.Where(x => x.UserName == username).FirstOrDefault();
            return Ok(result);
        }

        // PUT: api/Users/5


        // POST: api/Users
        [HttpPost]
        [Route("api/user/save")]
        public async Task<DataResponse> saveUser(users user)
        {
            var entity = await _context.users.SingleOrDefaultAsync(q => q.ID == user.ID);
            if (entity == null)
            {
                entity = new users();
                _context.users.Add(entity);
            }

            entity.UserName = user.UserName;
            entity.Password = user.Password;
            entity.Role = user.Role;


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
        //[Route("api/auth/login")]
        //public async Task<ActionResult<users>> DeleteUser(int id)
        //{
        //    var user = await _context.users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return user;
        //}
        //private bool UserExists(int id)
        //{
        //    return _context.users.Any(e => e.ID == id);
        //}



    }
}

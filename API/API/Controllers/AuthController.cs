using API.Context;
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
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public AuthController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody] User user)
        {

            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return null;

            var resault = _context.users.SingleOrDefault(x => x.UserName == user.UserName);

            // check if username exists
            if (user == null)
                return null;


            var pass = _context.users.SingleOrDefault(x => x.Password == user.Password);

            //check if username exists
            if (pass == null)
                return null;


            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:8080",
                audience: "http://localhost:8080",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });

        }

        [HttpPost, Route("{login}/{patients}")]
        public async Task<IActionResult> LoginPatient([FromBody]  User user)
        {

            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                return null;

            var resault = _context.users.SingleOrDefault(q => q.UserName == user.UserName);
            var patientData = await _context.patients.Where(q => q.Mobile == user.UserName).ToListAsync();


            // check if username exists
            if (user == null)
                return null;


            var pass = _context.users.SingleOrDefault(x => x.Password == user.Password);

            //check if username exists
            if (pass == null)
                return null;


            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:55497",
                audience: "http://localhost:55497",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString , patientData} );

        }



        // GET: api/Users
        [HttpGet, Route("user"), Authorize]
        public IEnumerable<User> Getusers()
        {
            return _context.users.ToList();
        }

        // GET: api/Users/username
        [HttpGet("user/{username}"), Authorize]
        public ActionResult<User> Getuser(string username)
        {
            var result = _context.users.Where(x => x.UserName == username).FirstOrDefault();
            return Ok(result);
        }
      
        // PUT: api/Users/5
        [HttpPut("{id}"), Authorize]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.ID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost, Route("user")]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.ID }, user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }
        private bool UserExists(int id)
        {
            return _context.users.Any(e => e.ID == id);
        }



    }
}

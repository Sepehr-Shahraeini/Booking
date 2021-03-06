using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;

namespace API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public PostController(DatabaseContext context)
        {
            _context = context;

        }




        [HttpPost, DisableRequestSizeLimit]
        [Route("api/image/upload")]
        public async Task<IActionResult> UploadIamge()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost]
        [Route("api/post/upload")]
        public async Task<ActionResult<posts>> Post(posts post)
        {
            _context.posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPsychoanalyst", new { id = post.Id }, post);
        }




        [HttpGet, DisableRequestSizeLimit]
        [Route("getImage")]
        public IActionResult GetImage()
        {
            try
            {
                var folderName = Path.Combine("Resources", "Images");
                var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                var photo = Directory.EnumerateFiles(pathToRead)
                    .Where(IsAPhotoFile)
                    .Select(fullPath => Path.Combine(Path.GetFileName(fullPath)));


                return Ok(new { photo });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        private bool IsAPhotoFile(string fileName)
        {
            return fileName.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase)
                || fileName.EndsWith(".png", StringComparison.OrdinalIgnoreCase);
        }

        [HttpGet]
        [Route("api/posts/get")]
        public async Task<ActionResult<IEnumerable<posts>>> GetPosts()
        {
            var resault = _context.posts.ToList().OrderByDescending(q => q.Id);
            return Ok(resault);
            //return await _context.posts.ToListAsync();
        }


        [HttpGet]
        [Route("api/post/get/{title}")]
        public async Task<ActionResult<IEnumerable<posts>>> GetPost(string title)
        {
            var resault = await _context.posts.Where(q => q.Title == title).ToListAsync();
            return resault;
        }

    }
}

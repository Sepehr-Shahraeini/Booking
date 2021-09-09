using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Context
{
    public class DatabaseContext : DbContext
    {

        public DatabaseContext(DbContextOptions options)
         : base(options)
        {

        }


        public DbSet<Patient> patients { get; set; }
        public DbSet<psychoanalysts> psychoanalysts { get; set; }
        public DbSet<VisitingTime> visitingTimes { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Calendar> calendars { get; set; }
        public DbSet<Post> posts { get; set; }
        public DbSet<PostComment> postComments { get; set; }
        public DbSet<PostTag> postTags { get; set; }
        public DbSet<DateTable> dateTables { get; set; }
    }
}

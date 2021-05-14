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
            public DbSet<Psychoanalyst> psychoanalysts { get; set; }
            public DbSet<VisitingTime> visitingTimes { get; set; }
            public DbSet<User> users { get; set; }
            public DbSet<Calendar> calendars { get; set; }
        }
    }

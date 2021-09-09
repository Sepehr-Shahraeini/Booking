using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using API.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //atrina
            //Enable CORS
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod()
                 .AllowAnyHeader());
            });
            //services.AddCors();
            //JSON Serializer
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft
                .Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new DefaultContractResolver());
            //atrina
            services.AddDbContext<DatabaseContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<drkh_databaseContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequiredLength = 5;
            }).AddEntityFrameworkStores<drkh_databaseContext>()
               .AddDefaultTokenProviders();

            services.AddAuthentication(auth =>
            {
                auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    //ValidIssuer = "http://localhost:8081",
                    //ValidAudience = "http://localhost:8081",
                    ValidIssuer = "https://dr-khodabakhsh.ir",
                    ValidAudience = "https://dr-khodabakhsh.ir",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                };
            });
            //atrina requires using Microsoft.AspNet.OData.Extensions;
            services.AddMvc(options => options.EnableEndpointRouting = false);
           // services.AddOData();
            //services.AddScoped<IUserService, UserService>();
            //services.AddScoped<IFlightService, FlightService>();
            //services.AddScoped<ILibraryService, LibraryService>();
            //services.AddScoped<IWeatherService, WeatherService>();
            //services.AddScoped<IFlightBagService, FlightBagService>();
            //services.Configure<SecurityStampValidatorOptions>(options =>
            //    options.ValidationInterval = TimeSpan.FromDays(100)

            //    );


            services.AddControllers();
        }



        //public void ConfigureServices(IServiceCollection services)
        //{




        //    services.AddAuthentication(opt =>
        //                {
        //                    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        //                    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        //                })
        //       .AddJwtBearer(options =>
        //       {
        //           options.TokenValidationParameters = new TokenValidationParameters
        //           {
        //               ValidateIssuer = true,
        //               ValidateAudience = true,
        //               ValidateLifetime = true,
        //               ValidateIssuerSigningKey = true,
        //               ValidIssuer = "http://localhost:8081",
        //               ValidAudience = "http://localhost:8081",
        //               //ValidIssuer = "https://dr-khodabakhsh.ir",
        //               //ValidAudience = "https://dr-khodabakhsh.ir",
        //               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
        //           };
        //       });


        //    services.AddCors(options =>
        //    {
        //        options.AddDefaultPolicy(builder =>
        //        {
        //            builder.WithOrigins("http://localhost:8088")
        //            //builder.WithOrigins("https://api.dr-khodabakhsh.ir")
        //            .AllowAnyHeader()
        //            .AllowAnyMethod();
        //        });
        //    });

        //    services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
        //    services.AddDbContext<DatabaseContext>(options =>
        //         options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        //    services.Configure<FormOptions>(o =>
        //    {
        //        o.ValueLengthLimit = int.MaxValue;
        //        o.MultipartBodyLengthLimit = int.MaxValue;
        //        o.MemoryBufferThreshold = int.MaxValue;
        //    });

        //}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            // Enable Cors
            //app.UseCors("AllowOrigin");
            app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseMvc(routeBuilder =>
            //{
            //      routeBuilder.EnableDependencyInjection();
            //      routeBuilder.Select().OrderBy().MaxTop(null).Filter();
            //});

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
        }
    }
}

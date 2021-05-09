using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Globalization;

namespace Booking
{
    public class Program
    {
        public static void Main(string[] args)
        {
            PersianCalendar pc = new PersianCalendar();
            DateTime thisDate = DateTime.Now;

            // Display the current date using the Gregorian and Persian calendars.
            Console.WriteLine("Today in the Gregorian Calendar:  {0:dddd}, {0}", thisDate);
            Console.WriteLine("Today in the Persian Calendar:    {0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                          pc.GetDayOfWeek(thisDate),
                          pc.GetMonth(thisDate),
                          pc.GetDayOfMonth(thisDate),
                          pc.GetYear(thisDate),
                          pc.GetHour(thisDate),
                          pc.GetMinute(thisDate),
                          pc.GetSecond(thisDate));

            // Create a date using the Gregorian calendar.
            thisDate = new DateTime(2013, 5, 28, 10, 35, 0);
            Console.WriteLine("Gregorian Calendar:  {0:D} ", thisDate);
            Console.WriteLine("Persian Calendar:    {0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                              pc.GetDayOfWeek(thisDate),
                              pc.GetMonth(thisDate),
                              pc.GetDayOfMonth(thisDate),
                              pc.GetYear(thisDate),
                              pc.GetHour(thisDate),
                              pc.GetMinute(thisDate),
                              pc.GetSecond(thisDate));

            // Create a date using the Persian calendar.
            thisDate = pc.ToDateTime(1395, 4, 22, 12, 30, 0, 0);
            Console.WriteLine("Gregorian Calendar:  {0:D} ", thisDate);
            Console.WriteLine("Persian Calendar:    {0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                          pc.GetDayOfWeek(thisDate),
                          pc.GetMonth(thisDate),
                          pc.GetDayOfMonth(thisDate),
                          pc.GetYear(thisDate),
                          pc.GetHour(thisDate),
                          pc.GetMinute(thisDate),
                          pc.GetSecond(thisDate));

            // Show the Persian Calendar date range.
            Console.WriteLine("Minimum Persian Calendar date (Gregorian Calendar):  {0:D} ",
                              pc.MinSupportedDateTime);
            Console.WriteLine("Minimum Persian Calendar date (Persian Calendar):  " +
                              "{0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                              pc.GetDayOfWeek(pc.MinSupportedDateTime),
                              pc.GetMonth(pc.MinSupportedDateTime),
                              pc.GetDayOfMonth(pc.MinSupportedDateTime),
                              pc.GetYear(pc.MinSupportedDateTime),
                              pc.GetHour(pc.MinSupportedDateTime),
                              pc.GetMinute(pc.MinSupportedDateTime),
                              pc.GetSecond(pc.MinSupportedDateTime));

            Console.WriteLine("Maximum Persian Calendar date (Gregorian Calendar):  {0:D} ",
                              pc.MaxSupportedDateTime);
            Console.WriteLine("Maximum Persian Calendar date (Persian Calendar):  " +
                              "{0}, {1}/{2}/{3} {4}:{5}:{6}\n",
                              pc.GetDayOfWeek(pc.MaxSupportedDateTime),
                              pc.GetMonth(pc.MaxSupportedDateTime),
                              pc.GetDayOfMonth(pc.MaxSupportedDateTime),
                              pc.GetYear(pc.MaxSupportedDateTime),
                              pc.GetHour(pc.MinSupportedDateTime),
                              pc.GetMinute(pc.MaxSupportedDateTime),
                              pc.GetSecond(pc.MaxSupportedDateTime));

            CreateHostBuilder(args).Build().Run();
        }


       

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
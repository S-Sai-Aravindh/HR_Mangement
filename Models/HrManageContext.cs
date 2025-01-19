using HR_Mangement.Models;
using Microsoft.EntityFrameworkCore;

using Microsoft.VisualBasic;

namespace Hr_Management.Models
{
    public class HrManageContext : DbContext
    {
        public HrManageContext(DbContextOptions<HrManageContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            //modelBuilder.Entity<RegisterModule>().HasData(
            //    new RegisterModule { EmpId = 4570, FirstName = "Sai", LastName = "Aravindh", Department = "HR", DOB = new DateOnly(2003, 2, 27), Gender = "Male", Email = "sai@gmail.com", Phone = 9876556789, Password = "sai@123" }
            //    );


            //modelBuilder.Entity<LoginModule>().HasOne(l => l.Register).WithOne(r => r.Login) // Navigation to LoginModule
            //    .HasForeignKey<LoginModule>(l => l.EmpId);

            modelBuilder.Entity<AttendanceModule>().HasData(
         new AttendanceModule
         {
             Id = 1,
             EmployeeId = 1,
             Date = new DateOnly(2023, 12, 1), // Replace with a valid date
             InTime = new TimeSpan(9, 0, 0),   // 9:00 AM
             OutTime = new TimeSpan(17, 0, 0), // 5:00 PM
             ShortFall = "0"                     // Assuming no shortfall
         },
         new AttendanceModule
         {
             Id = 2,
             EmployeeId = 2,
             Date = new DateOnly(2023, 12, 2),
             InTime = new TimeSpan(10, 0, 0),  // 10:00 AM
             OutTime = new TimeSpan(18, 30, 0), // 6:30 PM
             ShortFall = "0.5"                  // Example shortfall in hours
         }
     );
        }



        public DbSet<LoginModule> Login { get; set; }
        public DbSet<RegisterModule> Register { get; set; }
        public DbSet<AttendanceModule> Attendance { get; set; }
        //public DbSet<AttendanceRecordModule> AttendanceRecord { get; set; }


    }
}

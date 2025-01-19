using HR_Mangement.Models;

namespace Hr_Management.Models
{
    public class AttendanceRecordModule
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public DateOnly Date { get; set; }
        public TimeSpan InTime { get; set; }
        public TimeSpan OutTime { get; set; }
        public string ShortFall { get; set; }

        // Constructor is only for DTO purposes, no need to map it to Db
        public AttendanceRecordModule(RegisterModule register, AttendanceModule attendance)
        {
            EmployeeId = register.EmpId;
            Name = $"{register.FirstName} {register.LastName}";
            Date = attendance.Date;
            InTime = attendance.InTime;
            OutTime = attendance.OutTime;
            ShortFall = attendance.ShortFall;
        }
    }
}

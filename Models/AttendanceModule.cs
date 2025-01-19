namespace HR_Mangement.Models
{
    public class AttendanceModule
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateOnly Date { get; set; }
        public TimeSpan InTime { get; set; }
        public TimeSpan OutTime { get; set; }
        public string ShortFall { get; set; } 

        //public void CalculateShortFall()
        //{
        //    TimeSpan standardWorkingHours = new TimeSpan(9, 0, 0); // 9 hours

        //    TimeSpan actualWorkedHours = OutTime - InTime;

        //    // ShortFall supports negative values as a formatted string
        //    ShortFall = (actualWorkedHours - standardWorkingHours).ToString(@"hh\:mm\:ss");
        //}
    }
}

using System.ComponentModel.DataAnnotations;

namespace Hr_Management.Models
{
    public class RegisterModule
    {
        [Key]
        public int EmpId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public DateOnly DOB { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public long Phone { get; set; }
        public string Password { get; set; }

        //public LoginModule Login { get; set; }
    }
}

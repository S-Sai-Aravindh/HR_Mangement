using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hr_Management.Models
{
    public class LoginModule
    {
        [Key]
        public int Id { get; set; }
        //[ForeignKey("RegisterModule")]
        public int EmpId { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        //public RegisterModule Register { get; set; }
    }
}

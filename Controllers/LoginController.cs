using Hr_Management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Hr_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly HrManageContext _context;

        public LoginController(HrManageContext context)
        {
            _context = context;
        }
        

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginModule>>> GetEmployees()
        {
            return await _context.Login.ToListAsync(); // Fetch all registered users
        }

        // GET: api/Register/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginModule>> GetEmployee(int id)
        {
            var employee = await _context.Login.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST: api/Login/Authenticate
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] LoginModule request)
        {
            // Validate input
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and Password are required." });
            }

            // Fetch the login record using the provided email
            var loginRecord = await _context.Login
                .FirstOrDefaultAsync(l => l.Email == request.Email);

            if (loginRecord == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Check if the password matches the one stored in Login table
            if (loginRecord.Password != request.Password)
            {
                return Unauthorized(new { message = "Invalid credentials." });
            }

            // Successful authentication
            return Ok(new
            {
                message = "Login successful",
                EmployeeId = loginRecord.EmpId, // Return EmployeeId for further use (e.g., session or token)
                Username = loginRecord.Email // Return email as the username
            });
        }
    }
}
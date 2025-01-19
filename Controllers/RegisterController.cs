using Hr_Management.Models; // Ensure this namespace matches your project structure
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hr_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly HrManageContext _context; // Use your actual DbContext class

        public RegisterController(HrManageContext context) // Injecting your DbContext
        {
            _context = context;
        }

        // GET: api/Register
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisterModule>>> GetEmployees()
        {
            return await _context.Register.ToListAsync(); // Fetch all registered users
        }

        // GET: api/Register/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisterModule>> GetEmployee(int id)
        {
            var employee = await _context.Register.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST: api/Register
        [HttpPost]
        public async Task<IActionResult> Register(RegisterModule model)
        {
            if (ModelState.IsValid)
            {
                // Check if the email already exists in the Register table
                var existingUser = await _context.Register.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (existingUser != null)
                {
                    return BadRequest("Email is already in use.");
                }

                // Add new employee to the Register table
                _context.Register.Add(model);
                await _context.SaveChangesAsync();

                // Create a new entry in the Login Table
                var loginEntry = new LoginModule
                {
                    Email = model.Email,
                    EmpId = model.EmpId,
                    Password = model.Password // Hash the password
                };

                _context.Login.Add(loginEntry); // Assuming you have a DbSet<LoginModule> Login in your DbContext
                await _context.SaveChangesAsync(); // Save changes to the database

                return CreatedAtAction(nameof(GetEmployee), new { id = model.EmpId }, model); // Return created response
            }
            return BadRequest(ModelState); // Return bad request if model state is invalid
        }
    }
}
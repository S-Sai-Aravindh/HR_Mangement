using Microsoft.AspNetCore.Mvc;
using System; 
using Hr_Management.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using HR_Mangement.Models;

namespace HR_Mangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : Controller
    {
        private readonly HrManageContext _context;

        public AttendanceController(HrManageContext context)
        {
            _context = context;
        }

        // GET: api/attendance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceModule>>> GetAttendances()
        {
            return await _context.Attendance.ToListAsync(); // Fetch all attendance records
        }

        // GET: api/attendance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceModule>> GetAttendance(int id)
        {
            var attendance = await _context.Attendance.FindAsync(id);

            if (attendance == null)
            {
                return NotFound(new { message = "Attendance record not found." });
            }

            return attendance;
        }

        // POST: api/attendance
        [HttpPost]
        public async Task<IActionResult> CreateAttendance([FromBody] AttendanceModule attendance)
        {
            // Validate input
            if (attendance == null)
            {
                return BadRequest(new { message = "Attendance details cannot be null." });
            }

            if (attendance.EmployeeId <= 0)
            {
                return BadRequest(new { message = "Invalid EmployeeId." });
            }

            if (attendance.Date == default)
            {
                return BadRequest(new { message = "Date is required." });
            }

            // Validate InTime and OutTime
            if (attendance.InTime == default || attendance.OutTime == default)
            {
                return BadRequest(new { message = "InTime and OutTime are required." });
            }

            //attendance.CalculateShortFall(); 

            // Check if attendance for this employee on this date already exists
            var existingAttendance = await _context.Attendance
                .FirstOrDefaultAsync(a => a.EmployeeId == attendance.EmployeeId && a.Date == attendance.Date);

            if (existingAttendance != null)
            {
                return BadRequest(new { message = "Attendance for this employee on this date already exists." });
            }

            // Add the attendance record to the database
            await _context.Attendance.AddAsync(attendance);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Log the error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetAttendance), new { id = attendance.Id }, attendance);
        }

    }
    }

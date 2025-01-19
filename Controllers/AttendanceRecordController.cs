using Hr_Management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceRecordController : ControllerBase
    {
        private readonly HrManageContext _context; // Your actual DbContext class

        public AttendanceRecordController(HrManageContext context) // Injecting your DbContext
        {
            _context = context;
        }

        // GET: api/AttendanceRecord/employeeId
        [HttpGet("{employeeId}")]
        public async Task<ActionResult<IEnumerable<AttendanceRecordModule>>> GetAttendanceRecords(int employeeId)
        {
            // Fetch employee's register info
            var register = await _context.Register.FirstOrDefaultAsync(r => r.EmpId == employeeId);

            if (register == null)
            {
                return NotFound("Employee not found.");
            }

            // Fetch attendance records for the given employee
            var attendanceRecords = await _context.Attendance
                                                   .Where(a => a.EmployeeId == employeeId)
                                                   .ToListAsync();

            // Combine register and attendance data into a list of AttendanceRecordModule
            var attendanceRecordModules = attendanceRecords.Select(attendance => new AttendanceRecordModule(register, attendance)).ToList();

            return Ok(attendanceRecordModules); // Return attendance records as JSON
        }

        // GET: api/AttendanceRecord
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceRecordModule>>> GetAllAttendanceRecords()
        {
            // Fetch all attendance records
            var attendanceRecords = await _context.Attendance.ToListAsync();

            if (attendanceRecords == null || !attendanceRecords.Any())
            {
                return NotFound("No attendance records found.");
            }

            // Combine attendance records with employee data from the Register table
            var attendanceRecordModules = attendanceRecords.Select(attendance =>
            {
                var register = _context.Register.FirstOrDefault(r => r.EmpId == attendance.EmployeeId);
                return new AttendanceRecordModule(register, attendance);
            }).ToList();

            return Ok(attendanceRecordModules); // Return all attendance records as JSON
        }

        // POST: api/AttendanceRecord
        [HttpPost]
        public async Task<IActionResult> CreateAttendanceRecord(AttendanceRecordModule model)
        {
            if (ModelState.IsValid)
            {
                // Assuming AttendanceRecord is not stored in Db but fetched dynamically, no insert in Db
                return CreatedAtAction(nameof(GetAttendanceRecords), new { employeeId = model.EmployeeId }, model);
            }

            return BadRequest(ModelState); // Return bad request if model state is invalid
        }
    }
}

using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
    [ApiController]
    [Route("api/enrollment")]
    public class EnrollmentController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public EnrollmentController(IServiceManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEnrollments([FromQuery] int? courseId = null)
        {
            var enrollments = _manager.EnrollmentService.GetAllEnrollments(false);

            if (courseId.HasValue)
                enrollments = enrollments.Where(e => e.CourseId == courseId.Value);

            var enrollmentList = await enrollments.ToListAsync();
            return Ok(enrollmentList);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEnrollment([FromBody] Enrollment enrollment)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var (isSuccess, message) = await _manager.EnrollmentService.AddEnrollment(enrollment);

            if (isSuccess)
                return CreatedAtAction(nameof(GetAllEnrollments), new { courseId = enrollment.CourseId }, enrollment);

            return BadRequest(new { Success = isSuccess, Message = message });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEnrollmentGrade(int id, [FromBody] EnrollmentDtoForGrade enrollmentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var enrollment = await _manager.EnrollmentService.GetEnrollmentById(id, false);
            if (enrollment == null)
                return NotFound("Enrollment not found.");

            enrollmentDto.EnrollmentId = id;
            var (isSuccess, message) = await _manager.EnrollmentService.UpdateOneEnrollmentGrade(enrollmentDto);

            if (isSuccess)
                return Ok(new { Success = isSuccess, Message = message });

            return BadRequest(new { Success = isSuccess, Message = message });
        }
    }
}
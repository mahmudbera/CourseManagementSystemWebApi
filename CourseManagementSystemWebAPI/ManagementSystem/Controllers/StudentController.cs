using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using Entities.Models;
using Entities.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
	[ApiController]
	[Route("api/student")]
	public class StudentController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public StudentController(IServiceManager manager)
		{
			_manager = manager;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllStudents([FromQuery] string? statu = null)
		{
			var students = await _manager.StudentService.GetAllStudents(false).ToListAsync();

			if (!string.IsNullOrEmpty(statu))
				students = students.Where(s => s.Status == statu).ToList();

			return Ok(students);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetStudentById(int id)
		{
			var student = await _manager.StudentService.GetStudentById(id, false);
			if (student == null)
				return NotFound("Student not found.");

			decimal totalCredits = 0m;
			decimal totalGradePoints = 0m;

			if (student.Enrollments != null)
			{
				foreach (var enrollment in student.Enrollments)
				{
					if (enrollment.Grade.HasValue && enrollment.Course != null)
					{
						var grade = enrollment.Grade.Value;
						var course = enrollment.Course;

						totalCredits += course.Credits;
						totalGradePoints += grade * course.Credits;
					}
				}
			}

			decimal averageGrade = totalCredits > 0 ? totalGradePoints / totalCredits : 0m;

			return Ok(new
			{
				Student = student,
				AverageGrade = averageGrade
			});
		}

		[HttpPost]
		public async Task<IActionResult> CreateStudent([FromBody] Student student)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			student.EnrollmentDate = DateTime.Now;

			var (isSuccess, message) = await _manager.StudentService.CreateStudent(student);

			if (!isSuccess)
				return BadRequest(message);

			return CreatedAtAction(nameof(GetStudentById), new { id = student.StudentId }, student);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateStudent(int id, [FromBody] StudentDtoForUpdate studentDto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			studentDto.StudentId = id;
			var (isSuccess, message) = await _manager.StudentService.UpdateOneStudent(studentDto);

			if (!isSuccess)
				return BadRequest(message);

			return NoContent();
		}

		[HttpPut("{id}/deactivate")]
		public async Task<IActionResult> DeactivateStudent(int id)
		{
			var student = await _manager.StudentService.GetStudentById(id, false);
			if (student == null)
				return NotFound("Student not found.");

			if (student.Status != "Active")
				return BadRequest("Only active users can be deactivated.");

			var (isSuccess, message) = await _manager.StudentService.DeactivateStudent(id);

			if (!isSuccess)
				return BadRequest(message);

			return NoContent();
		}
	}

}
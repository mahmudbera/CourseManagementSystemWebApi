using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
	[ApiController]
	[Route("api/course")]
	public class CourseController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public CourseController(IServiceManager manager)
		{
			_manager = manager;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllCourses()
		{
			var courses = await _manager.CourseService.GetAllCourses(false).ToListAsync();
			return Ok(courses);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetCourseById(int id)
		{
			var course = await _manager.CourseService.GetCourseById(id, false);
			if (course == null)
				return NotFound("Course not found");
			return Ok(course);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseDtoForUpdate course)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			course.Status = course.InstructorId != null ? "Active" : "Inactive";
			var (isSuccess, message) = await _manager.CourseService.UpdateOneCourse(course);

			if (!isSuccess)
				return BadRequest(message);

			return NoContent();
		}

		[HttpPost]
		public async Task<IActionResult> CreateCourse([FromBody] Course course)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			course.Status = course.InstructorId != null ? "Active" : "Inactive";
			var (isSuccess, message) = await _manager.CourseService.CreateCourse(course);

			if (!isSuccess)
				return BadRequest(message);

			return CreatedAtAction(nameof(GetCourseById), new { id = course.CourseId }, course);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCourse(int id)
		{
			var (isSuccess, message) = await _manager.CourseService.DeleteCourse(id);

			if (!isSuccess)
				return BadRequest(message);

			return NoContent();
		}
	}
}
using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
	[ApiController]
	[Route("api/instructor")]
	public class InstructorController : ControllerBase
	{
		private readonly IServiceManager _manager;

		public InstructorController(IServiceManager manager)
		{
			_manager = manager;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllInstructors()
		{
			try
			{
				var instructors = await _manager.InstructorService.GetAllInstructors(false).ToListAsync();
				return Ok(instructors);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, new
				{
					Error = "An error occurred while retrieving the instructors.",
					Details = ex.Message
				});
			}
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateInstructor(int id, [FromBody] InstructorDtoForUpdate instructorDto)
		{
			if (!ModelState.IsValid)
				return BadRequest(new { Error = "Invalid data.", Details = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });

			var (isSuccess, message) = await _manager.InstructorService.UpdateOneInstructor(instructorDto);

			if (isSuccess)
				return Ok(new { Message = "Instructor updated successfully." });

			return StatusCode(StatusCodes.Status500InternalServerError, new { Error = "Failed to update the instructor.", Details = message });
		}

		[HttpPost]
		public async Task<IActionResult> CreateInstructor([FromBody] Instructor instructor)
		{
			if (!ModelState.IsValid)
				return BadRequest(new { Error = "Invalid data.", Details = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });

			var (isSuccess, message) = await _manager.InstructorService.CreateInstructor(instructor);

			if (isSuccess)
				return CreatedAtAction(nameof(GetInstructorById), new { id = instructor.InstructorId }, new { Message = message, Data = instructor });

			return StatusCode(StatusCodes.Status500InternalServerError, new { Error = "Failed to create the instructor.", Details = message });
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetInstructorById(int id)
		{
			var instructor = await _manager.InstructorService.GetInstructorById(id, false);
			if (instructor == null)
				return NotFound(new { Error = "Instructor not found." });

			return Ok(instructor);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteInstructor(int id)
		{
			var (isSuccess, message) = await _manager.InstructorService.DeleteInstructor(id);

			if (isSuccess)
				return Ok(new { Message = "Instructor deleted successfully." });

			return StatusCode(StatusCodes.Status500InternalServerError, new { Error = "Failed to delete the instructor.", Details = message });
		}
	}
}
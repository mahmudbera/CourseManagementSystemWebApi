using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ManagementSystem.Controllers
{
    [ApiController]
    [Route("api/classroom")]
    public class ClassroomController : ControllerBase
    {
        private readonly IServiceManager _manager;

        public ClassroomController(IServiceManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClassrooms()
        {
            try
            {
                var classrooms = await _manager.ClassroomService.GetAllClassrooms(false).ToListAsync();
                return Ok(new { Data = classrooms });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Error = "An error occurred while retrieving classrooms.",
                    Details = ex.Message
                });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassroomById([FromRoute] int id)
        {
            var classroom = await _manager.ClassroomService.GetClassroomById(id, false);
            if (classroom == null)
                return NotFound(new { Error = "Classroom not found." });

            return Ok(classroom);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassroom(int id, [FromBody] ClassroomDtoForUpdate classroomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    Error = "Invalid data.",
                    Details = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });

            var (isSuccess, message) = await _manager.ClassroomService.UpdateClassroom(classroomDto);

            if (isSuccess)
                return Ok(new { Message = "Classroom updated successfully." });

            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                Error = "Failed to update the classroom.",
                Details = message
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateClassroom([FromBody] Classroom classroom)
        {
            if (!ModelState.IsValid)
                return BadRequest(new
                {
                    Error = "Invalid data.",
                    Details = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
                });

            var (isSuccess, message) = await _manager.ClassroomService.CreateClassroom(classroom);

            if (isSuccess)
                return CreatedAtAction(nameof(GetClassroomById), new { id = classroom.ClassroomId }, new
                {
                    Message = "Classroom created successfully.",
                    Data = classroom
                });

            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                Error = "Failed to create the classroom.",
                Details = message
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassroom(int id)
        {
            var result = await _manager.ClassroomService.DeleteClassroomById(id);

            if (result.Success)
                return Ok(new { Message = "Classroom deleted successfully." });

            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                Error = "Failed to delete the classroom.",
                Details = result.Message
            });
        }

        [HttpGet("available-courses/{id}")]
        public async Task<IActionResult> GetAvailableCourses(int id)
        {
            try
            {
                var availableCourses = await _manager.CourseService.GetAvailableCourses(id)
                    .Select(c => new { c.CourseId, c.CourseName })
                    .ToListAsync();

                return Ok(availableCourses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Error = "An error occurred while retrieving available courses.",
                    Details = ex.Message
                });
            }
        }

        [HttpGet("available-courses-for-new")]
        public async Task<IActionResult> GetAvailableCoursesForNewClassroom()
        {
            try
            {
                var availableCourses = await _manager.CourseService.GetAvailableCoursesForNewClassroom()
                    .Select(c => new { c.CourseId, c.CourseName })
                    .ToListAsync();

                return Ok(availableCourses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    Error = "An error occurred while retrieving available courses for new classroom.",
                    Details = ex.Message
                });
            }
        }
    }
}

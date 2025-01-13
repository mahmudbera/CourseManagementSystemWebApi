using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ManagementSystem.Models;
using Services.Contracts;

namespace ManagementSystem.Controllers;

[ApiController]
[Route("api/home")]
public class HomeController : ControllerBase
{
    private readonly IServiceManager _manager;
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger, IServiceManager manager)
    {
        _logger = logger;
        _manager = manager;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboardStatistics()
    {
        try
        {
            var statistics = new
            {
                ActiveStudents = await _manager.StudentService.GetActiveStudentsCount(),
                ActiveCourses = await _manager.CourseService.GetActiveCoursesCount(),
                ActiveClassrooms = await _manager.ClassroomService.GetActiveClassroomsCount(),
                TotalInstructors = await _manager.InstructorService.GetTotalInstructorsCount()
            };

            return Ok(statistics);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while retrieving dashboard statistics.");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving statistics.");
        }
    }

    [HttpGet("error")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return StatusCode(StatusCodes.Status500InternalServerError, new
        {
            RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
        });
    }
}


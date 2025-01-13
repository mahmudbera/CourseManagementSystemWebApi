using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
	public interface ICourseService
	{
		Task<int> GetActiveCoursesCount();
		IQueryable<Course> GetAllCourses(bool trackChanges);
		IQueryable<Course> GetAvailableCourses(int id);
		IQueryable<Course> GetAvailableCoursesForNewClassroom();
		Task<Course?> GetCourseById(int id, bool trackChanges);
		Task<(bool isSuccess, string message)> CreateCourse(Course course);
		Task<(bool isSuccess, string message)> UpdateOneCourse(CourseDtoForUpdate courseDto);
		Task<(bool Success, string Message)> DeleteCourse(int courseId);
	}
}
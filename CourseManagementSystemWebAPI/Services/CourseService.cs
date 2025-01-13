using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Repositories.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Services.Contracts
{
    public class CourseService : ICourseService
    {
        private readonly IRepositoryManager _manager;
        private readonly IMapper _mapper;

        public CourseService(IRepositoryManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<int> GetActiveCoursesCount()
        {
            return await _manager.Course.GetAllCourses(trackChanges: false)
                .Where(c => c.Status == "Active")
                .CountAsync();
        }

        public IQueryable<Course> GetAllCourses(bool trackChanges)
        {
            return _manager.Course.GetAllCourses(trackChanges);
        }

        public IQueryable<Course> GetAvailableCourses(int id)
        {
            var courses = _manager.Course.GetAllCourses(false);
            return courses.Where(c => (c.Classroom == null || c.Classroom.ClassroomId == id) && c.Status.Equals("Active"));
        }

        public IQueryable<Course> GetAvailableCoursesForNewClassroom()
        {
            return _manager.Course.GetAllCourses(false)
                .Where(c => c.Classroom == null && c.Status == "Active");
        }

        public async Task<Course?> GetCourseById(int id, bool trackChanges)
        {
            return await _manager.Course.GetCourseById(id, trackChanges);
        }

        public async Task<(bool isSuccess, string message)> UpdateOneCourse(CourseDtoForUpdate courseDto)
        {
            var entity = _mapper.Map<Course>(courseDto);

            var existingCourse = await _manager.Course.GetAllCourses(false)
                .FirstOrDefaultAsync(c => c.CourseName == entity.CourseName && c.CourseId != entity.CourseId);

            if (existingCourse != null)
                return (false, "Another course with the same name already exists.");
                
            _manager.Course.UpdateOneCourse(entity);
            bool changes = await _manager.SaveAsync();

            if (changes)
                return (true, "Course updated successfully.");
            else
                return (false, "No changes were made or an error occurred.");
        }

        public async Task<(bool isSuccess, string message)> CreateCourse(Course course)
        {
            var existingCourse = await _manager.Course.GetCourseByName(course.CourseName, false);
            if (existingCourse != null)
                return (false, "A course with this name already exists.");

            _manager.Course.CreateCourse(course);
            bool result = await _manager.SaveAsync();
            if (result)
                return (true, "Course successfully created.");
            else
                return (false, "Failed to save the course.");
        }

        public async Task<(bool Success, string Message)> DeleteCourse(int courseId)
        {
            var course = await _manager.Course.GetCourseById(courseId, trackChanges: true);

            if (course == null)
                return (false, "Course not found.");

            if (course.Status != "Inactive")
                return (false, "Only inactive courses can be deleted.");

            if (course.Enrollments == null || !course.Enrollments.Any())
            {
                _manager.Course.Remove(course);
                await _manager.SaveAsync();
                return (true, "Course deleted successfully.");
            }

            bool allEnrollmentsHaveGrades = course.Enrollments.All(e => e.Grade != null);

            if (allEnrollmentsHaveGrades)
            {
                _manager.Course.Remove(course);
                await _manager.SaveAsync();
                return (true, "Course deleted successfully.");
            }

            return (false, "Course cannot be deleted because it has enrollments without grades.");
        }
    }
}
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories
{
	public class CourseRepository : RepositoryBase<Course>, ICourseRepository
	{
		public CourseRepository(RepositoryContext repositoryContext)
			: base(repositoryContext)
		{
		}

        public void CreateCourse(Course course) => Create(course);

        public IQueryable<Course> GetAllCourses(bool trackChanges) => FindAll(trackChanges).Include(c => c.Classroom).Include(c => c.Instructor);

        public async Task<Course?> GetCourseById(int id, bool trackChanges)
        {
            return await FindByCondition(c => c.CourseId.Equals(id), trackChanges)
                    .Include(c => c.Classroom)
                    .Include(c => c.Instructor)
                    .Include(c => c.Enrollments)
                    .ThenInclude(e => e.Student)
                    .SingleOrDefaultAsync();
        }

        public async Task<Course?> GetCourseByName(string name, bool trackChanges) => 
            await FindByCondition(c => c.CourseName.ToLower().Equals(name.ToLower()), trackChanges)
                .SingleOrDefaultAsync();

        public void UpdateOneCourse(Course course) => Update(course);
    }
}
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories
{
	public class StudentRepository : RepositoryBase<Student>, IStudentRepository
	{
		public StudentRepository(RepositoryContext repositoryContext)
			: base(repositoryContext)
		{
		}

        public void CreateStudent(Student student)
        {
			Create(student);
        }

        public IQueryable<Student> GetAllStudents(bool trackChanges)
        {
            return FindAll(trackChanges);
        }

        public async Task<Student?> GetStudentById(int id, bool trackChanges)
        {
            return await FindByCondition(s => s.StudentId.Equals(id), trackChanges)
                .Include(s => s.Enrollments!)
                .ThenInclude(e => e.Course!)
                .SingleOrDefaultAsync();
        }

        public void UpdateOneStudent(Student student) => Update(student);
    }
}
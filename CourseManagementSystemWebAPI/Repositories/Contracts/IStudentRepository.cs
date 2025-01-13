using Entities.Models;

namespace Repositories.Contracts
{
	public interface IStudentRepository : IRepositoryBase<Student>
	{
		IQueryable<Student> GetAllStudents(bool trackChanges);
		void CreateStudent(Student student);
		Task<Student?> GetStudentById(int id, bool trackChanges);
		void UpdateOneStudent(Student student);
	}
}
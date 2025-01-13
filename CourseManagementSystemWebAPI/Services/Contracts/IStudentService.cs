using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
	public interface IStudentService
	{
		IQueryable<Student> GetAllStudents(bool trackChanges);
		Task<int> GetActiveStudentsCount();
		Task<Student?> GetStudentById(int id, bool trackChanges);
		Task<(bool isSuccess, string message)> CreateStudent(Student student);
		Task<(bool isSuccess, string message)> DeactivateStudent(int id);
		Task<(bool isSuccess, string message)> UpdateOneStudent(StudentDtoForUpdate studentDto);
	}
}
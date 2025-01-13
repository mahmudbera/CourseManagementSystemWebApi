using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
	public interface IInstructorService
	{
		IQueryable<Instructor> GetAllInstructors(bool trackChanges);
		Task<int> GetTotalInstructorsCount();
		Task<Instructor?> GetInstructorById(int instructorId, bool trackChanges);
		Task<(bool isSuccess, string message)> CreateInstructor(Instructor instructor);
		Task<(bool isSuccess, string message)> DeleteInstructor(int instructorId);
		Task<(bool isSuccess, string message)> UpdateOneInstructor(InstructorDtoForUpdate instructorDto);
	}
}
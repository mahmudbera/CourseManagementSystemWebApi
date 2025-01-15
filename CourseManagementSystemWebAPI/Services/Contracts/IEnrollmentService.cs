using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
	public interface IEnrollmentService
	{
		IQueryable<Enrollment> GetAllEnrollments(bool trackChanges);
		Task<Enrollment?> GetEnrollmentById(int id, bool trackChanges);
		Task<(bool isSuccess, string message)> UpdateOneEnrollmentGrade(EnrollmentDtoForGrade enrollmentDto);
		Task<(bool isSuccess, string message)> AddEnrollment(Enrollment enrollment);
		Task<(bool isSuccess, string message)> DeleteEnrollment(int id);
	}
}
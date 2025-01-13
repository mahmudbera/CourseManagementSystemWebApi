using Entities.Models;

namespace Repositories.Contracts
{
	public interface IEnrollmentRepository : IRepositoryBase<Enrollment>
	{
		IQueryable<Enrollment> GetAllEnrollments(bool trackChanges);
		Task<Enrollment?> GetEnrollmentById(int id, bool trackChanges);
		void CreateEnrollment(Enrollment enrollment);
		void UpdateOneEnrollment(Enrollment enrollment);
	}
}
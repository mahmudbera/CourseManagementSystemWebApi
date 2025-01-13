using Entities.Models;

namespace Repositories.Contracts
{
	public interface IInstructorRepository : IRepositoryBase<Instructor>
	{
		IQueryable<Instructor> GetAllInstructors(bool trackChanges);
		Task<Instructor?> GetOneInstructor(int instructorId, bool trackChanges);
		void AddInstructor(Instructor instructor);
		void UpdateOneInstructor(Instructor instructor);
		void RemoveInstructor(Instructor instructor);
	}
}
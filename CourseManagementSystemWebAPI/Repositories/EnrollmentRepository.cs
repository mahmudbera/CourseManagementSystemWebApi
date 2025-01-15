using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories
{
	public class EnrollmentRepository : RepositoryBase<Enrollment>, IEnrollmentRepository
	{
		public EnrollmentRepository(RepositoryContext context)
			: base(context)
		{
		}

        public void CreateEnrollment(Enrollment enrollment) => Create(enrollment);

        public IQueryable<Enrollment> GetAllEnrollments(bool trackChanges) => FindAll(trackChanges).Include(e => e.Course).Include(e => e.Student);

        public void UpdateOneEnrollment(Enrollment enrollment) => Update(enrollment);

        public async Task<Enrollment?> GetEnrollmentById(int id, bool trackChanges)
        {
            return await FindByCondition(e => e.EnrollmentId.Equals(id), trackChanges)
                .Include(e => e.Course)
                .Include(e => e.Student)
                .SingleOrDefaultAsync();
        }

        public void DeleteEnrollment(Enrollment enrollment) => Remove(enrollment);
    }
}
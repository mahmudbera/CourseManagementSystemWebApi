namespace Repositories.Contracts
{
	public interface IRepositoryManager
	{
		IClassroomRepository Classroom { get; }
		ICourseRepository Course { get; }
		IEnrollmentRepository Enrollment { get; }
		IInstructorRepository Instructor { get; }
		IStudentRepository Student { get; }
		bool Save();
		Task<bool> SaveAsync();
	}
}
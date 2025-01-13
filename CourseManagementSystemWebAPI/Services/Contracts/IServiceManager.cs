namespace Services.Contracts
{
	public interface IServiceManager
	{
		IClassroomService ClassroomService { get; }
		ICourseService CourseService { get; }
		IEnrollmentService EnrollmentService { get; }
		IInstructorService InstructorService { get; }
		IStudentService StudentService { get; }

	}
}
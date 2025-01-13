using Services.Contracts;

namespace Services
{
    public class ServiceManager : IServiceManager
    {
        private readonly IClassroomService _classroomService;


        private readonly ICourseService _courseService;
		private readonly IEnrollmentService _enrollmentService;
		private readonly IInstructorService _instructorService;
		private readonly IStudentService _studentService;
        public ServiceManager(IClassroomService classroomService, ICourseService courseService, IEnrollmentService enrollmentService, IInstructorService instructorService, IStudentService studentService)
        {
            _classroomService = classroomService;
            _courseService = courseService;
            _enrollmentService = enrollmentService;
            _instructorService = instructorService;
            _studentService = studentService;
        }

		public IClassroomService ClassroomService => _classroomService;
		public ICourseService CourseService => _courseService;
		public IEnrollmentService EnrollmentService => _enrollmentService;
		public IInstructorService InstructorService => _instructorService;
		public IStudentService StudentService => _studentService;
		

    }
}
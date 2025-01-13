using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Contracts;
using Services;
using Services.Contracts;

namespace ManagementSystem.Infrastructure.Extensions
{
	public static class ServiceExtension
	{
		public static void ConfiugureDbContext(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContext<RepositoryContext>(options =>
			{
				options.UseSqlite(configuration.GetConnectionString("sqlconnection"), 
				b => b.MigrationsAssembly("ManagementSystem")
				);
			});
		}

		public static void ConfigureSession(this IServiceCollection services)
		{
			services.AddDistributedMemoryCache();
			services.AddSession(options =>
			{
				options.Cookie.Name = "System.Session";
				options.IdleTimeout = TimeSpan.FromMinutes(10);
			});
		}

		public static void ConfigureRepositoryRegistration(this IServiceCollection services)
		{
			services.AddScoped<IRepositoryManager, RepositoryManager>();
			services.AddScoped<IClassroomRepository, ClassroomRepository>();
			services.AddScoped<ICourseRepository, CourseRepository>();
			services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
			services.AddScoped<IInstructorRepository, InstructorRepository>();
			services.AddScoped<IStudentRepository, StudentRepository>();
		}

		public static void ConfigureServiceRegistration(this IServiceCollection services)
		{
			services.AddScoped<IServiceManager, ServiceManager>();
			services.AddScoped<IClassroomService, ClassroomService>();
			services.AddScoped<ICourseService, CourseService>();
			services.AddScoped<IEnrollmentService, EnrollmentService>();
			services.AddScoped<IInstructorService, InstructorService>();
			services.AddScoped<IStudentService, StudentService>();
		}

		public static void ConfigureRouting(this IServiceCollection services)
		{
			services.AddRouting(options =>
			{
				options.LowercaseUrls = true;
				options.AppendTrailingSlash = false;
			});
		}
	}
}
using System.Reflection;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
	public class RepositoryContext : DbContext
	{
		public DbSet<Student> Students { get; set; }
		public DbSet<Course> Courses { get; set; }
		public DbSet<Instructor> Instructors { get; set; }
		public DbSet<Enrollment> Enrollments { get; set; }
		public DbSet<Classroom> Classrooms { get; set; }
		
		public RepositoryContext(DbContextOptions<RepositoryContext> options)
		: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Fluent API configuration for relationships or constraints
			// modelBuilder.Entity<Enrollment>()
			// 	.HasOne(e => e.Student)
			// 	.WithMany(s => s.Enrollments)
			// 	.HasForeignKey(e => e.StudentId);

			// modelBuilder.Entity<Enrollment>()
			// 	.HasOne(e => e.Course)
			// 	.WithMany(c => c.Enrollments)
			// 	.HasForeignKey(e => e.CourseId);

			// modelBuilder.Entity<Course>()
			// 	.HasOne(c => c.Instructor)
			// 	.WithMany(i => i.Courses)
			// 	.HasForeignKey(c => c.InstructorId);

			// modelBuilder.Entity<Classroom>()
			// 	.HasOne(c => c.Course)
			// 	.WithOne(c => c.Classroom)
			// 	.HasForeignKey<Classroom>(c => c.CourseId);

			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
			
		}
	}
}
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.Config
{
	public class CourseConfig : IEntityTypeConfiguration<Course>
	{
		public void Configure(EntityTypeBuilder<Course> builder)
		{
			builder.HasKey(c => c.CourseId);
			builder.Property(c => c.CourseName).IsRequired().HasMaxLength(50);
			builder.Property(c => c.Description).IsRequired().HasMaxLength(255);
			builder.Property(c => c.Credits).IsRequired();
			builder.Property(c => c.Status).IsRequired().HasMaxLength(20);

			builder.HasOne(c => c.Instructor)
				.WithMany(i => i.Courses)
				.HasForeignKey(c => c.InstructorId);

			builder.HasData(
				new Course { CourseId = 1, CourseName = "Math 101", Description = "Basic Mathematics", Credits = 3, InstructorId = 1, Status = "Active" },
				new Course { CourseId = 2, CourseName = "History 101", Description = "Basic History", Credits = 3, InstructorId = 2, Status = "Active" },
				new Course { CourseId = 3, CourseName = "Physics 101", Description = "Introduction to Physics", Credits = 4, InstructorId = 3, Status = "Active" },
				new Course { CourseId = 4, CourseName = "Chemistry 101", Description = "Basic Chemistry", Credits = 4, InstructorId = 4, Status = "Active" },
				new Course { CourseId = 5, CourseName = "Computer Science 101", Description = "Introduction to Computer Science", Credits = 3, InstructorId = 5, Status = "Active" },
				new Course { CourseId = 6, CourseName = "Biology 101", Description = "Basic Biology", Credits = 3, InstructorId = 6, Status = "Active" },
				new Course { CourseId = 7, CourseName = "Literature 101", Description = "Introduction to Literature", Credits = 3, InstructorId = 7, Status = "Active" },
				new Course { CourseId = 8, CourseName = "Philosophy 101", Description = "Introduction to Philosophy", Credits = 3, InstructorId = 8, Status = "Active" }
			);
		}
	}
}
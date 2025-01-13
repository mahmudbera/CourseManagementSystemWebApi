using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.Config
{
	public class ClassroomConfig : IEntityTypeConfiguration<Classroom>
	{
		public void Configure(EntityTypeBuilder<Classroom> builder)
		{
			builder.HasKey(c => c.ClassroomId);
			builder.Property(c => c.ClassroomName).IsRequired().HasMaxLength(50);
			builder.Property(c => c.Capacity).IsRequired();

			builder.HasOne(c => c.Course)
			.WithOne(c => c.Classroom)
			.HasForeignKey<Classroom>(c => c.CourseId);

			builder.HasData(
				new Classroom { ClassroomId = 1, ClassroomName = "Room A", Capacity = 30, CourseId = 1 },
				new Classroom { ClassroomId = 2, ClassroomName = "Room B", Capacity = 25, CourseId = 2 },
				new Classroom { ClassroomId = 3, ClassroomName = "Room C", Capacity = 35, CourseId = 3 },
				new Classroom { ClassroomId = 4, ClassroomName = "Room D", Capacity = 40, CourseId = 4 },
				new Classroom { ClassroomId = 5, ClassroomName = "Room E", Capacity = 20, CourseId = 5 },
				new Classroom { ClassroomId = 6, ClassroomName = "Room F", Capacity = 50, CourseId = 6 },
				new Classroom { ClassroomId = 7, ClassroomName = "Room G", Capacity = 45, CourseId = 7 },
				new Classroom { ClassroomId = 8, ClassroomName = "Room H", Capacity = 30, CourseId = 8 }
			);
		}
	}
}
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repositories.Config
{
	public class InstructorConfig : IEntityTypeConfiguration<Instructor>
	{
		public void Configure(EntityTypeBuilder<Instructor> builder)
		{
			builder.HasKey(i => i.InstructorId);
			builder.Property(i => i.FirstName).IsRequired().HasMaxLength(50);
			builder.Property(i => i.LastName).IsRequired().HasMaxLength(50);
			builder.Property(i => i.Email).IsRequired().HasMaxLength(50);
			builder.Property(i => i.HireDate).IsRequired();

			builder.HasData(
				new Instructor { InstructorId = 1, FirstName = "John", LastName = "Doe", Email = "johndoe@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 2, FirstName = "Jane", LastName = "Smith", Email = "janesmith@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 3, FirstName = "Michael", LastName = "Brown", Email = "michaelbrown@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 4, FirstName = "Emily", LastName = "Davis", Email = "emilydavis@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 5, FirstName = "David", LastName = "Wilson", Email = "davidwilson@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 6, FirstName = "Sarah", LastName = "Martinez", Email = "sarahmartinez@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 7, FirstName = "Chris", LastName = "Taylor", Email = "christaylor@email.com", HireDate = DateTime.Now },
				new Instructor { InstructorId = 8, FirstName = "Laura", LastName = "Anderson", Email = "lauraanderson@email.com", HireDate = DateTime.Now }
			);

		}
	}
}
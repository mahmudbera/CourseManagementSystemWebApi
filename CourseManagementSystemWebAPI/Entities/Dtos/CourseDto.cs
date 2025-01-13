using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
	public record CourseDto
	{
		[Required(ErrorMessage = "Course Id is required")]
		public int CourseId { get; set; }

		[Required(ErrorMessage = "Course Name is required")]
		public string CourseName { get; set; }

		[Required(ErrorMessage = "Course Code is required")]
		public string Description { get; set; }

		[Required(ErrorMessage = "Credits is required")]
		public int Credits { get; set; }

		public int? InstructorId { get; set; } // Nullable for optional instructor assignment

		public string? Status { get; set; }
	}
}
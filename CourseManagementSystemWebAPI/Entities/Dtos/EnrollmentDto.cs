using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
	public record EnrollmentDto
	{
		[Required(ErrorMessage = "Enrollment Id is required")]
		public int EnrollmentId { get; set; }

		[Required(ErrorMessage = "Student Id is required")]
		public int StudentId { get; set; }

		[Required(ErrorMessage = "Course Id is required")]
		public int CourseId { get; set; }
		
		[Required(ErrorMessage = "Enrollment Date is required")]
		public DateTime EnrollmentDate { get; set; }
		public decimal? Grade { get; set; }
	}
}
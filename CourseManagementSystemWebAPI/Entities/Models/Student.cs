using System.ComponentModel.DataAnnotations;

namespace Entities.Models
{
	public class Student
	{
		[Required(ErrorMessage = "Student Id is required")]
		public int StudentId { get; set; }

		[Required(ErrorMessage = "First Name is required")]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "Last Name is required")]
		public string LastName { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string Email { get; set; }

		[Required(ErrorMessage = "Date of Birth is required")]
		public DateTime DateOfBirth { get; set; }

		[Required(ErrorMessage = "Enrollment Date is required")]
		public DateTime EnrollmentDate { get; set; }

		public string Status { get; set; } = "Active";

		// Navigation Property
		public ICollection<Enrollment>? Enrollments { get; set; }
	}

}
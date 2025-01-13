using System.ComponentModel.DataAnnotations;

namespace Entities.Models
{

	public class Instructor
	{
		[Required(ErrorMessage = "Instructor Id is required")]
		public int InstructorId { get; set; }

		[Required(ErrorMessage = "First Name is required")]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "Last Name is required")]
		public string LastName { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string Email { get; set; }
		
		[Required(ErrorMessage = "Hire Date is required")]
		public DateTime HireDate { get; set; }

		// Navigation Property
		public ICollection<Course>? Courses { get; set; }
	}

}
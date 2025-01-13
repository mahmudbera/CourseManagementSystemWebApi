using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
	public record StudentDto
	{
		public int StudentId { get; set; }

		[Required(ErrorMessage = "First Name is required")]
		public string FirstName { get; set; }

		[Required(ErrorMessage = "Last Name is required")]
		public string LastName { get; set; }

		[Required(ErrorMessage = "Email is required")]
		public string Email { get; set; }

		[Required(ErrorMessage = "Date of Birth is required")]
		public DateTime DateOfBirth { get; set; }
		public string Status { get; set; }

	}
}
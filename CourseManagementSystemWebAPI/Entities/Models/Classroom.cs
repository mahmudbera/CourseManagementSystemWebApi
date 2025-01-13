using System.ComponentModel.DataAnnotations;

namespace Entities.Models
{
	public class Classroom
	{
		[Required(ErrorMessage = "Classroom name is a required field.")]
		public int ClassroomId { get; set; }

		[Required(ErrorMessage = "Classroom name is a required field.")]
		public string ClassroomName { get; set; }
		
		[Required(ErrorMessage = "Capacity is a required field.")]
		public int Capacity { get; set; }
		public int? CourseId { get; set; }

		// Navigation Property
		public Course? Course { get; set; }
	}
}
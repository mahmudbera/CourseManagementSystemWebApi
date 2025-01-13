using System;
using System.ComponentModel.DataAnnotations;
namespace Entities.Models
{

	public class Enrollment
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

		// Navigation Properties
		public Student? Student { get; set; }
		public Course? Course { get; set; }
	}

}
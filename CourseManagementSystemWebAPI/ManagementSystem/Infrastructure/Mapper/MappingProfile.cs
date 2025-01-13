using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Microsoft.AspNetCore.Identity;

namespace ManagementSystem.Infrastructer.Mapper
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<StudentDtoForUpdate, Student>();
			CreateMap<StudentDtoForDeactivate, Student>();

			CreateMap<CourseDtoForUpdate, Course>();

			CreateMap<ClassroomDtoForUpdate, Classroom>();

			CreateMap<EnrollmentDtoForGrade, Enrollment>();

			CreateMap<InstructorDtoForUpdate, Instructor>();
		}
	}
}
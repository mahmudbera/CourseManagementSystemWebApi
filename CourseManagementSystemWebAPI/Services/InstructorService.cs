using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;
using Services.Contracts;

namespace Services
{
    public class InstructorService : IInstructorService
    {
        private readonly IRepositoryManager _manager;
        private readonly IMapper _mapper;

        public InstructorService(IRepositoryManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public IQueryable<Instructor> GetAllInstructors(bool trackChanges)
        {
            return _manager.Instructor.GetAllInstructors(trackChanges);
        }

        public async Task<int> GetTotalInstructorsCount()
        {
            return await _manager.Instructor.GetAllInstructors(false).CountAsync();
        }

        public async Task<(bool isSuccess, string message)> CreateInstructor(Instructor instructor)
        {
            bool instructorExists = await _manager.Instructor
                .GetAllInstructors(false)
                .AnyAsync(i => i.Email == instructor.Email);

            if (instructorExists)
                return (false, "An instructor with the same email already exists.");

            _manager.Instructor.AddInstructor(instructor);
            bool result = await _manager.SaveAsync();

            if (result)
                return (true, "Instructor successfully created.");
            else
                return (false, "An error occurred while creating instructor.");
        }

        public async Task<(bool isSuccess, string message)> DeleteInstructor(int instructorId)
        {
            var instructor = await _manager.Instructor.GetOneInstructor(instructorId, false);
            if (instructor == null)
                return (false, "Instructor not found.");

            var relatedCourses = await _manager.Course
                .FindByCondition(c => c.InstructorId == instructorId, false)
                .ToListAsync();

            foreach (var course in relatedCourses)
            {
                var hasIncompleteGrades = await _manager.Enrollment
                    .FindByCondition(e => e.CourseId == course.CourseId, false)
                    .AnyAsync(e => e.Grade == null);

                if (hasIncompleteGrades)
                    return (false, "Instructor cannot be deleted as there are enrollments with missing grades.");
            }

            if (!relatedCourses.Any())
            {
                _manager.Instructor.RemoveInstructor(instructor);
                await _manager.SaveAsync();
                return (true, "Instructor deleted successfully.");
            }

            return (false, "Instructor cannot be deleted as they are associated with courses.");
        }

        public async Task<(bool isSuccess, string message)> UpdateOneInstructor(InstructorDtoForUpdate instructorDto)
        {
            var entity = _mapper.Map<Instructor>(instructorDto);

            bool instructorExists = await _manager.Instructor
                .GetAllInstructors(false)
                .AnyAsync(i => i.FirstName == entity.FirstName 
                    && i.LastName == entity.LastName 
                    && i.Email == entity.Email 
                    && i.InstructorId != entity.InstructorId);

            if (instructorExists)
                return (false, "An instructor with the same name and email already exists.");

            _manager.Instructor.UpdateOneInstructor(entity);
            bool isSaved = await _manager.SaveAsync();
            
            if (isSaved)
                return (true, "Instructor updated successfully.");
            else
                return (false, "An error occurred while updating the instructor.");
        }

        public async Task<Instructor?> GetInstructorById(int instructorId, bool trackChanges)
        {
            return await _manager.Instructor.GetOneInstructor(instructorId, trackChanges);
        }
    }
}
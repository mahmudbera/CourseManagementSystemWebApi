using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly IRepositoryManager _manager;
        private readonly IMapper _mapper;

        public ClassroomService(IRepositoryManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public async Task<int> GetActiveClassroomsCount()
        {
            var activeClassroomsCount = await _manager.Classroom.GetAllClassrooms(false).CountAsync();
            return activeClassroomsCount;
        }

        public IQueryable<Classroom> GetAllClassrooms(bool trackChanges)
        {
            return _manager.Classroom.GetAllClassrooms(trackChanges);
        }

        public async Task<Classroom?> GetClassroomById(int id, bool trackChanges)
        {
            return await _manager.Classroom.GetClassroomById(id, trackChanges);
        }

        public async Task<(bool isSuccess, string message)> UpdateClassroom(ClassroomDtoForUpdate classroomDto)
        {
            var entity = _mapper.Map<Classroom>(classroomDto);
            _manager.Classroom.UpdateClassroom(entity);
            bool changes = await _manager.SaveAsync();

            if (changes)
                return (true, "Classroom updated successfully.");
            else
                return (false, "No changes were made or an error occurred.");
        }

        public async Task<(bool isSuccess, string message)> CreateClassroom(Classroom classroom)
        {
            var existingClassroom = await _manager.Classroom.GetAllClassrooms(false)
                .FirstOrDefaultAsync(c => c.ClassroomName == classroom.ClassroomName);

            if (existingClassroom != null)
                return (false, "A classroom with the same name already exists.");

            _manager.Classroom.AddClassroom(classroom);
            bool result = await _manager.SaveAsync();

            if (result)
                return (true, "Classroom successfully created.");
            else
                return (false, "An error occurred while creating classroom.");
        }

        public async Task<(bool Success, string Message)> DeleteClassroomById(int id)
        {
            var classroom = await GetClassroomById(id, false);
            if (classroom == null)
                return (false, "Classroom not found.");

            if (classroom.Course != null)
                return (false, "Classroom is assigned to a course. Please unassign it first.");

            _manager.Classroom.RemoveClassroom(classroom);
            await _manager.SaveAsync();
            return (true, "Classroom deleted successfully.");
        }
    }
}
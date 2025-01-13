using Entities.Dtos;
using Entities.Models;

namespace Services.Contracts
{
	public interface IClassroomService
	{
		IQueryable<Classroom> GetAllClassrooms(bool trackChanges);
		Task<Classroom?> GetClassroomById(int id, bool trackChanges);
		Task<int> GetActiveClassroomsCount();
		Task<(bool isSuccess, string message)> UpdateClassroom(ClassroomDtoForUpdate classroomDto);
		Task<(bool isSuccess, string message)> CreateClassroom(Classroom classroom);
		Task<(bool Success, string Message)> DeleteClassroomById(int id);
	}
}
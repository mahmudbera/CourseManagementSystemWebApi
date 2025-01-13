using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Repositories.Contracts;
using Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Services
{
    public class StudentService : IStudentService
    {
        private readonly IRepositoryManager _manager;
        private readonly IMapper _mapper;

        public StudentService(IRepositoryManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public IQueryable<Student> GetAllStudents(bool trackChanges)
        {
            return _manager.Student.GetAllStudents(trackChanges);
        }

        public async Task<Student?> GetStudentById(int id, bool trackChanges)
        {
            return await _manager.Student.GetStudentById(id, trackChanges);
        }

        public async Task<int> GetActiveStudentsCount()
        {
            return await _manager.Student.GetAllStudents(false)
                .Where(s => s.Status == "Active")
                .CountAsync();
        }

        public async Task<(bool isSuccess, string message)> CreateStudent(Student student)
        {
            var existingStudent = await _manager.Student
                .GetAllStudents(false)
                .FirstOrDefaultAsync(s => s.Email == student.Email);

            if (existingStudent != null)
                return (false, "A student with the same email already exists.");

            _manager.Student.CreateStudent(student);
            bool result = _manager.Save();

            if (result)
                return (true, "Student successfully created.");
            else
                return (false, "Failed to create student.");
        }

        public async Task<(bool isSuccess, string message)> DeactivateStudent(int id)
        {
            var student = await _manager.Student.GetStudentById(id, false);
            if (student == null)
                return (false, "Student not found.");

            bool hasEnrollments = await checkEnrollments(id);
            if (!hasEnrollments)
                return (false, "The student has incomplete grades in their enrollments.");

            var studentDto = new StudentDtoForDeactivate
            {
                StudentId = id,
                FirstName = student.FirstName,
                LastName = student.LastName,
                Email = student.Email,
                Status = "Inactive"
            };
            var entity = _mapper.Map<Student>(studentDto);
            _manager.Student.UpdateOneStudent(entity);
            _manager.Save();

            return (true, "Student successfully deactivated.");
        }

        public async Task<(bool isSuccess, string message)> UpdateOneStudent(StudentDtoForUpdate studentDto)
        {
            var student = await _manager.Student.GetStudentById(studentDto.StudentId, false);
            if (student == null)
                return (false, "Student not found.");

            var existingStudent = _manager.Student
                .GetAllStudents(false)
                .FirstOrDefault(s => s.StudentId != studentDto.StudentId && s.Email == studentDto.Email);

            if (existingStudent != null)
                return (false, "A student with the same email already exists.");

            var entity = _mapper.Map<Student>(studentDto);
            _manager.Student.UpdateOneStudent(entity);

            bool result = _manager.Save();
            if (result)
                return (true, "Student successfully updated.");
            else
                return (false, "Failed to update student.");
        }
    
        private async Task<bool> checkEnrollments(int id)
        {
            var student = await _manager.Student.GetStudentById(id, false);
            if (student == null)
                return false;
            var enrollments = student.Enrollments;
            if (enrollments != null && enrollments.Any(e => e.Grade == null))
                return false;
            return true;
        }
    }
}
using AutoMapper;
using Entities.Dtos;
using Entities.Models;
using Repositories.Contracts;

namespace Services.Contracts
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly IRepositoryManager _manager;
        private readonly IMapper _mapper;

        public EnrollmentService(IRepositoryManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }

        public IQueryable<Enrollment> GetAllEnrollments(bool trackChanges)
        {
            return _manager.Enrollment.GetAllEnrollments(trackChanges);
        }

        public async Task<Enrollment?> GetEnrollmentById(int id, bool trackChanges)
        {
            return await _manager.Enrollment.GetEnrollmentById(id, trackChanges);
        }

        public async Task<(bool isSuccess, string message)> AddEnrollment(Enrollment enrollment)
        {
            _manager.Enrollment.CreateEnrollment(enrollment);
            bool result = await _manager.SaveAsync();

            if (result)
                return (true, "Enrollment successfully created.");
            else
                return (false, "Failed to create enrollment.");
        }

        public async Task<(bool isSuccess, string message)> UpdateOneEnrollmentGrade(EnrollmentDtoForGrade enrollmentDto)
        {
            var enrollment = _mapper.Map<Enrollment>(enrollmentDto);
            _manager.Enrollment.UpdateOneEnrollment(enrollment);
            bool result = await _manager.SaveAsync();

            if (result)
                return (true, "Grade successfully updated.");
            else
                return (false, "Failed to update grade.");
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Services.Contracts;

namespace ManagementSystem.Components
{
	public class CoursesMenuViewComponent : ViewComponent
	{
		private readonly IServiceManager _manager;

        public CoursesMenuViewComponent(IServiceManager manager)
        {
            _manager = manager;
        }

        public IViewComponentResult Invoke()
		{
			var courses = _manager.CourseService.GetAllCourses(false);
			return View(courses);
		}
	}
}
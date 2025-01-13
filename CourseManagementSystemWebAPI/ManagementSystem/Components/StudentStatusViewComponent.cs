using Microsoft.AspNetCore.Mvc;
using Services.Contracts;
using System.Threading.Tasks;

namespace ManagementSystem.Components
{
	public class StudentStatusViewComponent : ViewComponent
	{
		private readonly IServiceManager _manager;

        public StudentStatusViewComponent(IServiceManager manager)
        {
            _manager = manager;
        }

        public IViewComponentResult Invoke()
		{
			return View();
		}
	}
}
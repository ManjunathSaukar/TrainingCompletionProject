using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ToDoDalLib.Models;
using ToDoDalLib.Repository;
using ToDoWebApi.DTO;

namespace ToDoWebApiApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly IRepository<Tasks> _taskRepository;
        public TasksController(IRepository<Tasks> taskRepository)
        {
            _taskRepository = taskRepository;
        }
        [Authorize]
        [HttpGet("GetAllTasks/{id:Guid}")]
        public async Task<ActionResult> GetAllTask(Guid id)
        {
            var tasks = await _taskRepository.GetAll().Where(t =>t.UserId  == id)
                .Include(st => st.SubTasks)
                .ToListAsync();
            return Ok(tasks);
        }
        [Authorize]
        [HttpPost("AddTask/{id:Guid}")]
        public async Task<IActionResult> AddTaskDeatils([FromBody] TasksDto task, Guid id)
        {
            if (task == null)
            {
                return BadRequest(new { Message = "Task Details is not Found!!" });
            }
            var _task = new Tasks
            {
                Name = task.Name,
                Status = task.Status.ToUpper(),
                UserId = id
            };
             _taskRepository.Add(_task);
            return Ok(new { Message = "Task Added Successfullly!!" });
        }
        [Authorize]
        [HttpGet("GetTaskById/{id:Guid}")]
        public async Task<IActionResult> GetTaskById(Guid id)
        {
            var task = await _taskRepository.GetAll().FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
            {
                return NotFound(new { Message = "Task Not Found.!!" });
            }
            return Ok(task);
        }
        [Authorize]
        [HttpDelete("DeleteTask/{id:Guid}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _taskRepository.GetAll().FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
            {
                return BadRequest(new { Message = "Task Not Found!!" });
            }
            _taskRepository.Delete(task);
            return Ok(new { Message = "Task Deleted Successfully!!" });
        }
        [Authorize]
        [HttpPut("UpdateTask/{id:Guid}")]
        public async Task<IActionResult> UpdateTask(Guid id,[FromBody] TasksDto task)
        {
            var _task = await _taskRepository.GetAll().FirstOrDefaultAsync(t => t.Id == id);

            if (_task == null)
            {
                return BadRequest(new { Message = "Task Details Not Found!!" });
            }
            _task.Name = (task.Name.IsNullOrEmpty() ? _task.Name : task.Name);
            _task.Status = (task.Status.IsNullOrEmpty() ? _task.Status : task.Status.ToUpper());
            _task.UserId = _task.UserId;

            _taskRepository.Update(_task);

            return Ok(new { Message = "Task Details Updated Successfully!!" });
        }
    }
}

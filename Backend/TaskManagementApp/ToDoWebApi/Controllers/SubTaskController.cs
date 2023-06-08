using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ToDoDalLib.Models;
using ToDoDalLib.Repository;
using ToDoWebApi.DTO;

namespace ToDoAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SubTaskController : ControllerBase
    {
        private readonly IRepository<SubTask> _subtaskRepo;
        public SubTaskController(IRepository<SubTask> subtaskRepo)
        {
            _subtaskRepo = subtaskRepo;
        }
        [Authorize]
        [HttpGet("GetAllSubTasks/{id:Guid}")]
        public async Task<ActionResult> GetAllSubTask(Guid id)
        {
            var subtasks = await _subtaskRepo.GetAll().Where(t => t.TaskId == id).ToListAsync();
            return Ok(subtasks);
        }
        [Authorize]
        [HttpGet("GetSubTaskById/{id:Guid}")]
        public async Task<IActionResult> GetSubTaskById(Guid id)
        {
            SubTask subtask = await _subtaskRepo.GetAll().FirstOrDefaultAsync(st => st.Id == id);
            if (subtask == null)
            {
                return NotFound(new { Message = "SubTask Not Found.!!" });
            }
            return Ok(subtask);
        }
        [Authorize]
        [HttpPost("AddSubTask/{id:Guid}")]
        public async Task<IActionResult> AddSubTaskDeatils([FromBody] SubTaskDto subtask, Guid id)
        {
            if (subtask == null)
            {
                return BadRequest(new { Message = "SubTask Details is not Found!!" });
            }
            var _subtask = new SubTask
            {
                Name = subtask.Name,
                Description = subtask.Description,
                Status = subtask.Status.ToUpper(),
                TaskId = id
            };
            _subtaskRepo.Add(_subtask);
            return Ok(new { Message = "SubTask Added Successfullly!!" });
        }
        [Authorize]
        [HttpDelete("DeleteSubTask/{id:Guid}")]
        public async Task<IActionResult> DeleteSubTask(Guid id)
        {
            var subtask = await _subtaskRepo.GetAll().FirstOrDefaultAsync(st => st.Id == id);
            if (subtask == null)
            {
                return BadRequest(new { Message = "SubTask Not Found!!" });
            }
            _subtaskRepo.Delete(subtask);
            return Ok(new { Message = "SubTask Deleted Successfully!!" });
        }
        [Authorize]
        [HttpPut("UpdateSubTask/{id:Guid}")]
        public async Task<IActionResult> UpdateSubTask([FromBody] SubTaskDto subtask, Guid id)
        {
            var _subtask = await _subtaskRepo.GetAll().FirstOrDefaultAsync(st => st.Id == id);

            if (_subtask == null)
            {
                return BadRequest(new { Message = "SubTask Details Not Found!!" });
            }
            Console.WriteLine(subtask.Status);
            _subtask.Name = (subtask.Name.IsNullOrEmpty() ? _subtask.Name : subtask.Name);
            _subtask.Description = (subtask.Description.IsNullOrEmpty() ? _subtask.Description : subtask.Description);
            _subtask.Status = (subtask.Status.IsNullOrEmpty() ? _subtask.Status : subtask.Status.ToUpper());
            _subtask.TaskId = _subtask.TaskId;

            _subtaskRepo.Update(_subtask);

            return Ok(new { Message = "SubTask Details Updated Successfully!!" });
        }
    }
}

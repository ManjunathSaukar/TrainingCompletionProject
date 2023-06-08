
namespace ToDoWebApi.DTO
{
    public class SubTaskDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; } 
        public Guid TaskId { get; set; }
    }
}


namespace ToDoWebApi.DTO
{
    public class TasksDto
    {
        public string Name { get; set; } = String.Empty;
        public string Status { get; set; } = "INPROGRESS";
        public Guid UserId { get; set; }
    }
}

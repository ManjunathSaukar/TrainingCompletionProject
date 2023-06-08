using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoDalLib.Models
{
    public class Tasks
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }=String.Empty;
        public string Status { get; set; } = "INPROGRESS";
        public List<SubTask> SubTasks { get; set; }
        public Tasks()
        {
            SubTasks = new List<SubTask>();
        }

        [JsonIgnore]
        public User? User { get; set; }
        public Guid UserId { get; set; }
        
    }
}

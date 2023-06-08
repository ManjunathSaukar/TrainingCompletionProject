using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ToDoDalLib.Models
{
    public class SubTask
    {
        [Key]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string Status { get; set; } = "INPROGRESS";


        [JsonIgnore]
        public Tasks? Task { get; set; }
        public Guid TaskId { get; set; }
    }
}

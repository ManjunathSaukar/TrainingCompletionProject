using System.ComponentModel.DataAnnotations;

namespace ToDoDalLib.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; } = "USER";
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? IsActive { get; set; } = "ACTIVE";
        public string? ProfileImage { get; set; }   // Set Url Image

        public List<Tasks>? Tasks { get; set; }
    }
}

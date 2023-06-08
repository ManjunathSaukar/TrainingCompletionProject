
namespace ToDoWebApi.DTO
{
    public class RegisterDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Role { get; set; }
        public string? Password { get; set; }
        public string? IsActive { get; set; }
        public string? ProfileImage { get; set; }   // Set Url Image
    }
}

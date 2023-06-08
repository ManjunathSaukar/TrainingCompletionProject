using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Text;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using ToDoDalLib.Repository;
using ToDoDalLib.Models;
using ToDoWebApi.DTO;
using ToDoWebApi.Database;

namespace ToDoWebApiApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;
        public UserController(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> AuthenticLogin([FromBody] LoginDto userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            var user = await _userRepository.GetAll().FirstOrDefaultAsync(u => u.UserName == userObj.UserName);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found!!" });
            }
            if (!PasswordHasher.VarifyPassword(userObj.Password, user.Password))
            {
                return BadRequest(new
                {
                    Message = "Password is Incorrect!!"
                });
            }
            if (user.IsActive.Equals("INACTIVE"))
            {
                return BadRequest(new {Message="User is Inactive.!!"});
            }

            return Ok(new
            {
                Role=user.Role,
                id=user.Id,
                Token = CreateJwt(user),
                Message = $"{user.Role} Login Successfull!"
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto registerObj)
        {
            if (registerObj == null)
            {
                return BadRequest();
            }

            // Check UserName
            if (await CheckUserNameExistAsync(registerObj.UserName))
            {
                return BadRequest(new
                {
                    Message = "UserName Already Exist!"
                });
            }
            // Check Email
            if (await CheckEmailExistAsync(registerObj.Email))
            {
                return BadRequest(new
                {
                    Message = "Email Already Exist!"
                });
            }
            // Check Password Strenth
            var pass = CheckPasswordStrenth(registerObj.Password);
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new
                {
                    Message = pass.ToString()
                });
            }

            //registerObj.Role = registerObj.ToUpper();
            var password=registerObj.Password;
            registerObj.Password = PasswordHasher.HashPassword(registerObj.Password);


            var user = new User
            {
                Name = registerObj.Name,
                Email = registerObj.Email,
                UserName = registerObj.UserName,
                Role="USER",
                IsActive="ACTIVE",
                Password = registerObj.Password,
                ProfileImage=registerObj.ProfileImage
            };

            _userRepository.Add(user);


            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("saukarmanjunath@gmail.com"));
            email.To.Add(MailboxAddress.Parse(user.Email));
            email.Subject = $"Welcome, {user.Name} in TaskMangement App";

            var emailBody = new StringBuilder();
            emailBody.AppendLine("<html>");
            emailBody.AppendLine("<body>");
            emailBody.AppendLine("<h1>Welcome to Task Management App</h1>");
            emailBody.AppendLine("<p>Thank you for registering to Task Management App. We are excited to have you on board!</p>");
            emailBody.AppendLine("<p>Here are some of the features you can enjoy:</p>");
            emailBody.AppendLine("<ul>");
            emailBody.AppendLine("<li>Task Creation and management</li>");
            emailBody.AppendLine("<li>Subtask tracking</li>");
            emailBody.AppendLine("<li>Task status updates</li>");
            emailBody.AppendLine("</ul>");
            emailBody.AppendLine($"<p>For your reference your :  User Name id {user.UserName}</p>");
            emailBody.AppendLine($"<p>Your Password is: {password}</p>");
            emailBody.AppendLine("<p>Feel free to explore the app and let us know if you have any questions or feedback.</p>");
            emailBody.AppendLine("<p>Enjoy your task management journey!</p>");
            emailBody.AppendLine("<hr />");
            emailBody.AppendLine("<p>This email is auto-generated. Please do not reply.</p>");
            emailBody.AppendLine("</body>");
            emailBody.AppendLine("</html>");

            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = emailBody.ToString() };
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate("saukarmanjunath@gmail.com", "klfd pnqn aftv euqd");
            smtp.Send(email);
            smtp.Disconnect(true);


            return Ok(new
            {
                Role = user.Role,
                id = user.Id,
                Token = CreateJwt(user),
                Message = $"{user.Role} Register Successfull!"
            });
        }
        [Authorize]
        [HttpPut("UpdateUser/{id:Guid}")]
        public async Task<IActionResult> UpdateUser(Guid id,[FromBody] RegisterDto updateObj)
        {
            User user = await _userRepository.GetAll().FirstOrDefaultAsync(u=>u.Id==id);
            if (user == null)
            {
                return BadRequest(new { message = "User Not Found.!!" });
            }
            user.Name = (updateObj.Name.IsNullOrEmpty() ? user.Name : updateObj.Name);
            user.Email = (updateObj.Email.IsNullOrEmpty() ? user.Email : updateObj.Email);
            user.UserName = (updateObj.UserName.IsNullOrEmpty() ? user.UserName : updateObj.UserName);
            user.Role = (updateObj.Role.IsNullOrEmpty() ? user.Role : updateObj.Role.ToUpper());
            user.Password = (updateObj.Password.IsNullOrEmpty() ? user.Password : PasswordHasher.HashPassword(updateObj.Password));
            user.IsActive = (updateObj.IsActive.IsNullOrEmpty() ? user.IsActive : updateObj.IsActive.ToUpper());
            user.ProfileImage = (updateObj.ProfileImage.IsNullOrEmpty() ? user.ProfileImage : updateObj.ProfileImage);
            _userRepository.Update(user);

            return Ok(new {Message = "User Updated Successfully.!!" });
        }
        [Authorize]
        [HttpDelete("DeleteUser/{id:Guid}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var user = await _userRepository.GetAll().FirstOrDefaultAsync(t => t.Id == id);
            if (user == null)
            {
                return BadRequest(new { Message = "User Not Found!!" });
            }
            _userRepository.Delete(user);
            return Ok(new { Message = "User Deleted Successfully!!" });
        }
        [Authorize]
        [HttpGet("GetUserById/{id:Guid}")]
        public async Task<IActionResult> GetAllUsers(Guid id)
        {
            var user = await _userRepository.GetAll().FirstOrDefaultAsync(u => u.Id == id);
            return Ok(user);
        }

        [Authorize]
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUsers()
        {
             var users = await _userRepository.GetAll().Where(u=>u.Role.Equals("USER"))
             .Include(t => t.Tasks)
             .ThenInclude(st => st.SubTasks)
             .ToListAsync();
             
             return Ok(users);
        }
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPasswordDto forgotPasswordObj)
        {
            if (forgotPasswordObj == null)
            {
                return BadRequest();
            }

            var user = await _userRepository.GetAll().FirstOrDefaultAsync(u => u.Email == forgotPasswordObj.UserEmail);
            if (user == null)
            {
                return NotFound(new { Message = "User Not Found" });
            }

            // Perform password reset logic here 
            // Update password in the database and handle success/error 

            // Example logic to update password 
            user.Password = PasswordHasher.HashPassword(forgotPasswordObj.NewPassword);
            _userRepository.Update(user);

            return Ok(new { Message = "Password Reset successful" });
        }
        private Task<bool> CheckUserNameExistAsync(string userName)
        {
            return _userRepository.GetAll().AnyAsync(u => u.UserName == userName);
        }
        private Task<bool> CheckEmailExistAsync(string email)
        {
            return _userRepository.GetAll().AnyAsync(u => u.Email == email);
        }
        private string CheckPasswordStrenth(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 8)
            {
                sb.Append("*.Minimum password length should be 8. " + Environment.NewLine);
            }
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]")
                && Regex.IsMatch(password, "[0-9]")))
            {
                sb.Append("*.Password should be Alphanumeric. " + Environment.NewLine);
            }
            if (!Regex.IsMatch(password, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
            {
                sb.Append("*.Password should contain special charecter. " + Environment.NewLine);
            }
            return sb.ToString();
        }
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name,$"{user.Name} {user.UserName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.UtcNow.AddMinutes(300000),
                //Expires = DateTime.UtcNow.AddSeconds(30),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}

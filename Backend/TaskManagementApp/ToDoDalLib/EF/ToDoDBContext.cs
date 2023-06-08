using Microsoft.EntityFrameworkCore;
using ToDoDalLib.Models;

namespace ToDoDalLib.EF
{
    public class ToDoDBContext : DbContext
    {
        public ToDoDBContext(DbContextOptions<ToDoDBContext> dbContext) : base(dbContext)
        {

        }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<SubTask> SubTasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}

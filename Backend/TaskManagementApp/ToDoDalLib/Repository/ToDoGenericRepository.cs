using Microsoft.EntityFrameworkCore;
using ToDoDalLib.EF;

namespace ToDoDalLib.Repository
{
    public class ToDoGenericRepository<T> : IRepository<T> where T : class
    {
        private readonly ToDoDBContext _dbContext;
        public ToDoGenericRepository(ToDoDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Add(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            _dbContext.SaveChanges();
        }

        public void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            _dbContext.SaveChanges();
        }

        public IQueryable<T> GetAll()
        {
            return _dbContext.Set<T>();
        }

        public void Update(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }
    }
}

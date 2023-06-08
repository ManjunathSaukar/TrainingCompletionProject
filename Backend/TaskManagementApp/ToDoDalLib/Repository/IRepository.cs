namespace ToDoDalLib.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll(); 
        void Add(T entity); 
        void Delete(T entity);  
        void Update(T entity);  
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using rentCar.Models;

namespace rentCar.Interfaces
{
    public interface IUser
    {
        Task<List<User>> GetUser();
        Task<User?> GetUserById(int id);
        Task<User?> AddUser(User user);
        Task<bool> UpdateUser(User user);
        Task<bool> DeleteUser(int userId);
    }
}

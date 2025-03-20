using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using rentCar.Models;

namespace rentCar.Interfaces
{
    public interface IRential
    {
         Task<List<Rential>> GetRential();
         Task<Rential?> GetRentilById(int rentialId);
         Task<Rential?> AddRential(Rential rential);
         Task<bool> UpdateRential(Rential rential);
         Task<bool> DeleteRential(int rential);
    }
}
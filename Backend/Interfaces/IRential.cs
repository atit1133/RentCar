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
         Task<Rential?> GetRentilById(int carId);
         Task<List<Rential>> GetRentilsByCarId(int carId);
         Task<Rential?> AddRential(Rential rential);
         Task<bool> UpdateRential(Rential rential);
         Task<bool> DeleteRential(int rential);
         Task<List<Rential>> GetRentialReportTotalMount();
         Task<List<Rential>> GetRentialReportTotalCurrentMount(int year, int month);
    }
}
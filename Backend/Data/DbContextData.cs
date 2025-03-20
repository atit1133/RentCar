using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using rentCar.Models;

namespace rentCar.Data
{
    public class DbContextData : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContextData(DbContextOptions<DbContextData> options) : base(options)
        {            
        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Rential> Rentials { get; set; }

        
    }
}
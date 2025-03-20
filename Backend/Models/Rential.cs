using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace rentCar.Models
{
    [Table("Rentials")]
    public class Rential
    {
        public int RentialId {get;set;}
        public int UserId {get;set;}
        public int CarId {get;set;}
        public DateTime StartDate {get; set;}
        public DateTime EndDate {get;set;}
        public string Status {get;set;}
        public decimal Total {get;set;}
        public string PaymentMethod {get;set;}
    }
}
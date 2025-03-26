using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace rentCar.Models
{
    public enum  Role {Admin, User}
    public class User
    {
        public int UserId{get; set;}
        public string Name{get; set;}
        public string Email{get;set;}
        public string Password{get; set;}
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Role Role {get;set;}

        
    }
}
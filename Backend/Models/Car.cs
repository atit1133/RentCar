using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace rentCar.Models
{
    /// <summary>   
    /// Enums for car properties
    /// </summary>
        public enum FuelType { Petrol, Diesel, Electric, Hybrid, LPG }
        public enum TransmissionType { Manual, Automatic }
        public enum CarStatus { Available, Rented, UnderMaintenance }
    public class Car
    {
        public int CarId {get; set;}
        public required string Brand {get;set;}
        public required string Model {get;set;}
        public required string Color {get;set;}
        public int Year{get;set;}
        public required string LicensePlate {get;set;}
        public required string Chassis {get;set;}
        public FuelType Fuel  {get;set;}
        public TransmissionType Transmission {get;set;}
        public required string Category {get;set;}
        public CarStatus Status {get;set;}
        public string? Image{get;set;}


    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace rentCar.Models
{
    public enum FuelType { Petrol, Diesel, Electric, Hybrid, LPG }
    public enum TransmissionType { Manual, Automatic }
    public enum CarStatus { Available, Rented, UnderMaintenance }

    public class Car
    {
        public int CarId { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Brand cannot exceed 50 characters.")]
        public required string Brand { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Model cannot exceed 50 characters.")]
        public required string Model { get; set; }

        [Required]
        public required string Color { get; set; }

        [Range(1886, int.MaxValue, ErrorMessage = "Year must be later than 1886.")]
        public int Year { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "License plate cannot exceed 10 characters.")]
        public required string LicensePlate { get; set; }

        [Required]
        public required string Chassis { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FuelType Fuel { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TransmissionType Transmission { get; set; }

        [Required]
        public required string Category { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public CarStatus Status { get; set; }

        public string? Image { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedDate { get; set; }
        public string? CreatedBy { get; set; }
    }
}

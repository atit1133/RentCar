using Microsoft.EntityFrameworkCore;
using rentCar.Data;
using rentCar.Interfaces;
using rentCar.Services;
using MySqlConnector; // Import this

var builder = WebApplication.CreateBuilder(args);

// Get the connection string from configuration
string connectionString = builder.Configuration.GetConnectionString("MySqlConnection");

// Add the DbContext using the connection string
builder.Services.AddDbContext<DbContextData>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 0))));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddControllers();
builder.Services.AddScoped<ICar, CarService>();
builder.Services.AddScoped<IRential, RentialService>();
builder.Services.AddScoped<IUser, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

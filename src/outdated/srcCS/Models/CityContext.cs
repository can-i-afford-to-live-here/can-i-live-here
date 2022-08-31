using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace src.Models
{
    public class CityContext : DbContext
    {
        public CityContext(DbContextOptions<CityContext> options)
            : base(options)
        {
        }

        public DbSet<City> Cities { get; set; } = null!;
    }
}
using Microsoft.EntityFrameworkCore;
using backend.Models;

public  class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Form> profiledata { get; set; }
}

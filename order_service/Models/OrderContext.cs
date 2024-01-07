using Microsoft.EntityFrameworkCore;
namespace order_service.Models;

public class OrderDBContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    public OrderDBContext(DbContextOptions<OrderDBContext> options) : base(options)
    {

    }
}

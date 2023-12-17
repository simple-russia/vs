using Microsoft.EntityFrameworkCore;
namespace inventory_service.Models;

public class InventoryContext : DbContext
{
    public DbSet<InventoryItem> InventoryItems { get; set; }

    public InventoryContext(DbContextOptions<InventoryContext> options) : base(options)
    {

    }
}
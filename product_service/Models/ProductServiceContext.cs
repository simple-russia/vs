using Microsoft.EntityFrameworkCore;
namespace product_service.Models;

public class ProductServiceContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    public ProductServiceContext(DbContextOptions<ProductServiceContext> options) : base(options)
    {

    }
}

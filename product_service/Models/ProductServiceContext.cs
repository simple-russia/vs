using Microsoft.EntityFrameworkCore;
namespace product_service.Models;

public class ProductServiceContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public string ConnectionString = "Server=postgres_db;Database=testappdb;Port=5432;User Id=postgres; Password=admin";

    public ProductServiceContext(DbContextOptions<ProductServiceContext> options) : base(options)
    {

    }
}

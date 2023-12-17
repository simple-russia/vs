using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using product_service.Models;
using product_service.Services;

namespace product_service.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    public ProductServiceContext _context;
    public MessageProducer _messageProducer;

    public ProductController(ProductServiceContext context, MessageProducer messageProducer)
    {
        _context = context;
        _messageProducer = messageProducer;
    }

    [HttpGet()]
    [Route("GetAllProducts")]
    public ActionResult GetProducts()
    {
        var products = _context.Products.ToList();
        return Ok(products);
    }

    [HttpGet()]
    [Route("product")]
    public async Task<ActionResult> GetProduct([FromQuery] int id)
    {
        var product = await _context.Products.SingleOrDefaultAsync(pr => pr.Id == id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpDelete()]
    [Route("product")]
    public async Task<ActionResult> DeleteProduct([FromQuery] int id)
    {
        var product = await _context.Products.SingleOrDefaultAsync(pr => pr.Id == id);

        if (product == null)
        {
            return NotFound();
        }

        await _context.Products.Where(p => p.Id == id).ExecuteDeleteAsync();
        _context.SaveChanges();

        return Ok();
    }

    [HttpPost()]
    [Route("product")]
    public ActionResult CreateProduct([FromBody] CreateProductInputDTO dto)
    {
        var product = new Product
        {
            name = dto.name,
            price = dto.price,
            unit = dto.unit,
        };

        _context.Products.Add(product);
        _context.SaveChanges();

        _messageProducer.SendMessage<Product>(product);

        return Ok();
    }

    [HttpPut()]
    [Route("product")]
    public async Task<ActionResult> UpdateProduct([FromBody] EditProductInputDTO dto)
    {
        var product = await _context.Products.SingleOrDefaultAsync(pr => pr.Id == dto.productId);

        if (product == null)
        {
            return NotFound();
        }

        product.name = dto.name;
        product.price = dto.price;
        product.unit = dto.unit;

        _context.SaveChanges();

        return Ok();
    }
}
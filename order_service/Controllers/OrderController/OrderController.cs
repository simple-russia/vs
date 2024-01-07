namespace order_service.Controllers;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using order_service.Models;

[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase
{
    public OrderDBContext _context;

    public OrderController(OrderDBContext context)
    {
        _context = context;
    }

    [HttpGet("getAllOrders")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = _context.Orders.ToList();

        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync("http://127.0.0.1:5001/api/products/getAllProducts");

        string responseBody = await response.Content.ReadAsStringAsync();
        List<Product> products = JsonConvert.DeserializeObject<List<Product>>(responseBody);

        List<GetAllOrderObjectOutput> orderItemsDTOs = new List<GetAllOrderObjectOutput>();

        foreach (var order in orders)
        {
            var product = products.Find(pr => pr.Id == order.Productid);
            if (product != null)
            {
                orderItemsDTOs.Add(new GetAllOrderObjectOutput
                {
                    id = order.Id,
                    amount = order.Amount,
                    name = product.name,
                    price = product.price * order.Amount,
                    productId = product.Id,
                    pricePerOne = product.price,
                    unit = product.unit,
                });
            }
            else
            {
                Console.WriteLine($"Could not find product for order ${order.Id}");
            }
        }

        return Ok(orderItemsDTOs);
    }

    [HttpGet("order")]
    public async Task<IActionResult> GetOrder([FromQuery] int orderId)
    {
        var order = _context.Orders.SingleOrDefault(or => or.Id == orderId);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost("order")]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderInputDTO dto)
    {
        var order = new Order
        {
            Amount = dto.amount,
            Productid = dto.productId,
        };

        _context.Orders.Add(order);
        _context.SaveChanges();

        return Ok();
    }

    [HttpDelete("order")]
    public async Task<IActionResult> DeleteOrder([FromQuery] int orderId)
    {
        var order = _context.Orders.SingleOrDefault(or => or.Id == orderId);

        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        _context.SaveChanges();

        return Ok(order);
    }

    [HttpPut("order")]
    public async Task<IActionResult> EditOrder()
    {
        return Ok();
    }
}
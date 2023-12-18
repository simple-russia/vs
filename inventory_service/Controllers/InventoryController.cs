using inventory_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace inventory_service.Controllers;

[ApiController]
[Route("api/inventory")]
public class InventoryController : ControllerBase
{
    public InventoryContext _context;
    public InventoryController(InventoryContext context)
    {
        _context = context;
    }

    [HttpGet("getAllInventoryItems")]
    public async Task<ActionResult> GetAllInventoryItems()
    {
        var inventoryItems = await _context.InventoryItems.ToListAsync();

        HttpClient client = new HttpClient();
        HttpResponseMessage response = await client.GetAsync("http://127.0.0.1:5001/api/products/getAllProducts");

        string responseBody = await response.Content.ReadAsStringAsync();
        List<Product> products = JsonConvert.DeserializeObject<List<Product>>(responseBody);

        List<GetInventoryItemOutputDTO> inventoryItemsDTOs = new List<GetInventoryItemOutputDTO>();

        foreach (var item in inventoryItems)
        {
            var productOfItem = products.Find(pr => pr.Id == item.Id);

            if (productOfItem != null)
            {
                inventoryItemsDTOs.Add(new GetInventoryItemOutputDTO {
                    id = item.Id,
                    productId = productOfItem.Id,
                    amount = item.Amount,
                    name = productOfItem.name,
                    unit = productOfItem.unit,
                });
            } else {
                Console.WriteLine($"[x] Could not find product for item {item.Id}");
            }
        }

        return Ok(inventoryItemsDTOs);
    }

    [HttpPost("increaseProductAmount")]
    public async Task<ActionResult> IncreaseProductAmount([FromQuery] string productid) // TODO add dto
    {
        return Ok();
    }

    [HttpPost("decreaseProductAmount")]
    public async Task<ActionResult> DecreaseProductAmount([FromQuery] string productid)
    {
        return Ok();
    }
}
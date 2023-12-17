using inventory_service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

        return Ok(inventoryItems);
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
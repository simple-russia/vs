namespace inventory_service.Models;

public class InventoryItem
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public float Amount { get; set; }
}

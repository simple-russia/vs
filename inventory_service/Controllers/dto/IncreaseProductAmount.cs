namespace inventory_service.Controllers;

public class IncreaseProductAmountInputDTO
{
    public int itemId { get; set; }
    public float increaseAmount { get; set; }
}

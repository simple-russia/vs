namespace inventory_service.Controllers;

public class DecreaseProductAmountInputDTO
{
    public int itemId { get; set; }
    public float decreaseAmount { get; set; }
}
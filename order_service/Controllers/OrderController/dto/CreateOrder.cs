namespace order_service.Controllers;

public class CreateOrderInputDTO
{
    public int productId { get; set; }
    public float amount { get; set; }
}

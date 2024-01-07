namespace order_service.Controllers;

public class EditOrderInputDTO
{
    public int id { get; set; }
    public int productId { get; set; }
    public float amount { get; set; }
}

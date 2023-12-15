namespace product_service.Controllers;

public class EditProductInputDTO
{
    public int productId { get; set; }
    public string name { get; set; }
    public float price { get; set; }
    public string unit { get; set; }
}

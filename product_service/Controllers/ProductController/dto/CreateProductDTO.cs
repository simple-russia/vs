namespace product_service.Controllers;

public class CreateProductInputDTO
{
    public string name { get; set; }
    public float price { get; set; }
    public string unit { get; set; }
}
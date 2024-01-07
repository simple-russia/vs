namespace order_service.Models;

public class GetAllOrderObjectOutput
{
    public int id { get; set; }
    public int productId { get; set; }
    public string name { get; set; }
    public float amount { get; set; }
    public float price { get; set; }
    public float pricePerOne { get; set; }
    public string unit { get; set; }
}
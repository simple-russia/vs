using Microsoft.AspNetCore.Mvc;

namespace product_service.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{
    public ProductController()
    {

    }

    [HttpGet()]
    [Route("GetAllProducts")]
    public ActionResult GetProducts()
    {
        return Ok();
    }

    [HttpGet()]
    [Route("product")]
    public ActionResult GetProduct([FromQuery] string id)
    {
        return Ok();
    }

    [HttpDelete()]
    [Route("product")]
    public ActionResult DeleteProduct([FromQuery] string id)
    {
        return Ok();
    }

    [HttpPost()]
    [Route("product")]
    public ActionResult CreateProduct([FromBody] CreateProductInputDTO dto)
    {
        return Ok();
    }

    [HttpPut()]
    [Route("product")]
    public ActionResult UpdateProduct([FromBody] EditProductInputDTO dto)
    {
        return Ok();
    }
}
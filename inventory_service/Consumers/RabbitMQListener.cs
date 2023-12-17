using System.Text;
using inventory_service.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace inventory_service.Consumers;

public class RabbitMQListener
{
    public InventoryContext context;
    private readonly string _connectionString;

    public RabbitMQListener(string connectionString)
    {
        _connectionString = connectionString;
        var optionsBuilder = new DbContextOptionsBuilder<InventoryContext>();
        optionsBuilder.UseNpgsql(_connectionString);
        context = new InventoryContext(optionsBuilder.Options);

        var factory = new ConnectionFactory()
        {
            HostName = "localhost",
            UserName = "admin",
            Password = "secret"
        };

        var conn = factory.CreateConnection();
        var channel = conn.CreateModel();
        channel.QueueDeclare("product", durable: true, exclusive: false);

        var consumer = new EventingBasicConsumer(channel);

        consumer.Received += (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var productString = Encoding.UTF8.GetString(body);
            dynamic product = JsonConvert.DeserializeObject<dynamic>(productString);
            int productId = product?.Id;

            AddProduct(productId);
        };

        channel.BasicConsume("product", true, consumer);
    }

    public void AddProduct(int productId)
    {
        try
        {
            var newInventoryItem = new InventoryItem()
            {
                Amount = 0,
                Id = productId,
            };

            context.InventoryItems.Add(newInventoryItem);
            context.SaveChanges();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}
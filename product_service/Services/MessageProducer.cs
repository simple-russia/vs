using System.Text;
using System.Text.Json;
using System.Threading.Channels;
using RabbitMQ.Client;

namespace product_service.Services;

public class MessageProducer
{
    public void SendMessage<T>(T msg)
    {
        var factory = new ConnectionFactory()
        {
            HostName = "localhost",
            UserName = "admin",
            Password = "secret"
        };

        var conn = factory.CreateConnection();

        using (var channel = conn.CreateModel())
        {
            channel.QueueDeclare("product", durable: true, exclusive: false);
            var jsonString = JsonSerializer.Serialize(msg);
            var body = Encoding.UTF8.GetBytes(jsonString);

            channel.BasicPublish("", "product", body: body);
        }
    }
}
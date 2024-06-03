const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

// Configuración de Kafka
const kafka = new Kafka({
  clientId: 'order-service',
  brokers: ['localhost:9092'] // Asegúrate de que esto coincide con tu configuración de Docker
});
const producer = kafka.producer();

// Conectar el productor al iniciar
const connectProducer = async () => {
  await producer.connect();
};
connectProducer().catch(console.error);

const createRequest = async (req, res) => {
  const orderData = req.body;
  const orderId = uuidv4(); // Genera un ID único para el pedido

  try {
    await producer.send({
      topic: 'requests',
      messages: [
        { key: orderId, value: JSON.stringify({ id: orderId, ...orderData }) },
      ],
    });
    res.status(200).json({ message: 'Order request sent successfully', id: orderId });
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
    res.status(500).json({ message: 'Failed to send order request', error: error.message });
  }
};

module.exports = {
  createRequest
};
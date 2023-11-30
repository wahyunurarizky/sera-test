import amqlib from 'amqplib'
import dotenv from 'dotenv'

dotenv.config()
;(async () => {
  const emailTo = process.argv[2] || process.env.EMAIL_TO

  try {
    const connection = await amqlib.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost:5672'
    )
    const channel = await connection.createChannel()

    const exchangeName = 'email-exchange'
    const key = 'email-key'

    const data = {
      email: emailTo
    }
    channel.assertExchange(exchangeName, 'direct', {
      durable: true
    })

    channel.publish(exchangeName, key, Buffer.from(JSON.stringify(data)), {
      persistent: true
    })

    console.log(`Sent: ${data.email}`)

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  } catch (error) {
    console.log(error)
  }
})()

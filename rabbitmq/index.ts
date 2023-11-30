import amqlib from 'amqplib'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: 'arizky.wna@gmail.com',
    pass: 'WsXSqPK6a1DOjdRU'
  }
})

dotenv.config()
;(async () => {
  try {
    const connection = await amqlib.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost:5672'
    )
    const channel = await connection.createChannel()

    const queue = 'send-email-queue'
    const key = 'email-key'

    channel.assertExchange('email-exchange', 'direct', {
      durable: true
    })

    await channel.assertQueue(queue, {
      // exclusive true akan menghapus queue jika unsubscribe
      exclusive: false,
      // time to life
      arguments: {
        'x-message-ttl': 10000
      }
    })

    // bind queue ke key
    channel.bindQueue(queue, 'email-exchange', key)
    console.log(`listening on queue ${queue} with key ${key}`)

    channel.consume(queue, async (data) => {
      if (data) {
        const payload = JSON.parse(data.content.toString())

        const info = await transport.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: payload.email, // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
        })

        console.log('Message sent: %s', info.messageId)

        // berikan sinyal sudah diterima
        channel.ack(data)
      }
    })
  } catch (error) {
    console.log(error)
  }
})()

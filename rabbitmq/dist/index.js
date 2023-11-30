"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'arizky.wna@gmail.com',
        pass: 'WsXSqPK6a1DOjdRU'
    }
});
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
        const channel = yield connection.createChannel();
        const queue = 'send-email-queue';
        const key = 'email-key';
        channel.assertExchange('email-exchange', 'direct', {
            durable: true
        });
        yield channel.assertQueue(queue, {
            // exclusive true akan menghapus queue jika unsubscribe
            exclusive: false,
            // time to life
            arguments: {
                'x-message-ttl': 10000
            }
        });
        // bind queue ke key
        channel.bindQueue(queue, 'email-exchange', key);
        console.log(`listening on queue ${queue} with key ${key}`);
        channel.consume(queue, (data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data) {
                const payload = JSON.parse(data.content.toString());
                const info = yield transport.sendMail({
                    from: '"Fred Foo 👻" <foo@example.com>', // sender address
                    to: payload.email, // list of receivers
                    subject: 'Hello ✔', // Subject line
                    text: 'Hello world?', // plain text body
                    html: '<b>Hello world?</b>' // html body
                });
                console.log('Message sent: %s', info.messageId);
                // berikan sinyal sudah diterima
                channel.ack(data);
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
}))();

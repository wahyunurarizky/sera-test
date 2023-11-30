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
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const emailTo = process.argv[2] || process.env.EMAIL_TO;
    try {
        const connection = yield amqplib_1.default.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
        const channel = yield connection.createChannel();
        const exchangeName = 'email-exchange';
        const key = 'email-key';
        const data = {
            email: emailTo
        };
        channel.assertExchange(exchangeName, 'direct', {
            durable: true
        });
        channel.publish(exchangeName, key, Buffer.from(JSON.stringify(data)), {
            persistent: true
        });
        console.log(`Sent: ${data.email}`);
        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    }
    catch (error) {
        console.log(error);
    }
}))();

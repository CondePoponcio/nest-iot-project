import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
const mqtt = require('mqtt');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /*const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule2, {
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://mosquitto:1883',
        },
      });*/
    await app.listen(8000);
    //await app2.listen();
}
bootstrap();

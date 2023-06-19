import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { KafkaConfig, NestConfig } from '@constants/environment/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const kafkaConfig = configService.get<KafkaConfig>('kafka');

  const kafkaService = app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [
          kafkaConfig?.BROKER_KAFKA_1,
          kafkaConfig?.BROKER_KAFKA_2,
          kafkaConfig?.BROKER_KAFKA_3,
        ],
      },
      consumer: {
        groupId: 'account-consumer',
      },
    },
  });

  app.connectMicroservice(kafkaService);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      whitelist: true,
    }),
  );

  await app.startAllMicroservices();
  await app.listen(nestConfig?.PORT || 3000);
}
bootstrap();

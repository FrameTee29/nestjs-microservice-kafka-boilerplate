import 'winston-daily-rotate-file';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import configuration from './constants/environment/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database') || {},
      inject: [ConfigService],
    }),
    UserModule,
    SharedModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IMessageBody } from './dto/logger.dto';

@Injectable()
export class CustomLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  info(data: IMessageBody) {
    this.logger.info(data);
  }

  error(data: IMessageBody) {
    this.logger.error(data);
  }
}

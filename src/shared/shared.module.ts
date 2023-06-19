import { Global, Module } from '@nestjs/common';

import { CustomLoggerModule } from 'src/shared/logger/logger.module';

@Global()
@Module({
  imports: [CustomLoggerModule],
})
export class SharedModule {}

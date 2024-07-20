import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { prettyTarget } from './utils/pretty.target';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
        customAttributeKeys: {
          req: 'request',
          res: 'response',
          err: 'error',
        },
        transport: { target: prettyTarget },
      },
    }),
    PaymentsModule,
  ],
})
export class AppModule {}

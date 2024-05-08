import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrintModelModule } from './print-model/print-model.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/printmonitorsystem'),
    PrintModelModule,
    PrinterModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

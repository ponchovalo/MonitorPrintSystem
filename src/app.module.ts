import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrinterModelModule } from './printer-model/printer-model.module';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/printmonitorsystem'),
    PrinterModelModule,
    PrinterModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}

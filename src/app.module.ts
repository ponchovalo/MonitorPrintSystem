import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrinterModelModule } from './printer-model/printer-model.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/printmonitorsystem'),
    PrinterModelModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}

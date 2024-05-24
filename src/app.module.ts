import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrinterModelModule } from './printer-model/printer-model.module';
import { PrinterModule } from './printer/printer.module';
import { CommonModule } from './common/common.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/printmonitorsystem'),
    PrinterModelModule,
    PrinterModule,
    CommonModule,
    StoreModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}

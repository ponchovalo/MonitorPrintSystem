import { Module } from '@nestjs/common';
import { PrinterService } from './printer.service';
import { PrinterController } from './printer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Printer, PrinterSchema } from './entities/printer.entity';
import { PrinterModelModule } from 'src/printer-model/printer-model.module';

@Module({
  controllers: [PrinterController],
  providers: [PrinterService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Printer.name,
        schema: PrinterSchema
      }
    ]),
    PrinterModelModule
  ]
})
export class PrinterModule {}

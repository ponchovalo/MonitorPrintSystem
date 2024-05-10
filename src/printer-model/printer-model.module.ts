import { Module } from '@nestjs/common';
import { PrinterModelService } from './printer-model.service';
import { PrinterModelController } from './printer-model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PrinterModel, PrinterModelSchema } from './entities/printer-model.entity';

@Module({
  controllers: [PrinterModelController],
  providers: [PrinterModelService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PrinterModel.name,
        schema: PrinterModelSchema
      }
    ])
  ],
  exports: [PrinterModelService]
})
export class PrinterModelModule {}

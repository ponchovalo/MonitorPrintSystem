import { Module } from '@nestjs/common';
import { PrintModelService } from './print-model.service';
import { PrintModelController } from './print-model.controller';
import { PrintModel, PrintModelSchema } from './entities/print-model.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PrintModelController],
  providers: [PrintModelService],
  imports: [
    MongooseModule.forFeature([ 
      { 
        name: PrintModel.name, 
        schema: PrintModelSchema 
      } 
    ]) 
  ]
})
export class PrintModelModule {}

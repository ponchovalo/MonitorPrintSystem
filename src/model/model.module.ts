import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, ModelSchema } from './entities/model.entity';

@Module({
  controllers: [ModelController],
  providers: [ModelService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Model.name,
        schema: ModelSchema
      }
    ])
  ]
})
export class ModelModule {}

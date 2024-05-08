import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePrintModelDto } from './dto/create-print-model.dto';
import { UpdatePrintModelDto } from './dto/update-print-model.dto';
import { PrintModel } from './entities/print-model.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PrintModelService {

  constructor(
    @InjectModel(PrintModel.name)
    private readonly printModelModel: Model<PrintModel>
  ){}

  async create(createPrintModelDto: CreatePrintModelDto) {
    try { 
      const printModel = await this.printModelModel.create(createPrintModelDto) 
      return printModel; 
    } catch (error) { 
      if(error.code === 11000){ 
        throw new BadRequestException(`Model exist in db ${JSON.stringify(error.keyValue)}`) 
      } 
      console.log(error) 
      throw new InternalServerErrorException(`Can't create Model - check server logs`) 
    } 
  }

  findAll() {
    return this.printModelModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} printModel`;
  }

  update(id: number, updatePrintModelDto: UpdatePrintModelDto) {
    return `This action updates a #${id} printModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} printModel`;
  }
}

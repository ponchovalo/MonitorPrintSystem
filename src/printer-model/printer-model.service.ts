import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePrinterModelDto } from './dto/create-printer-model.dto';
import { UpdatePrinterModelDto } from './dto/update-printer-model.dto';
import { PrinterModel } from './entities/printer-model.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PrinterModelService {

  constructor(
    @InjectModel(PrinterModel.name)
    private readonly printerModelModel: Model<PrinterModel>

  ){}


  async create(createPrinterModelDto: CreatePrinterModelDto) {

    createPrinterModelDto.brand = createPrinterModelDto.brand.toLocaleUpperCase();
    createPrinterModelDto.name = createPrinterModelDto.name.toLocaleUpperCase();
    createPrinterModelDto.type = createPrinterModelDto.type.toLocaleUpperCase();

    try {
      const printModel = await this.printerModelModel.create( createPrinterModelDto );
      return printModel;
    } catch (error) {
      this.handleExceptions(error)
    }
  }


  async findAll() {
    return await this.printerModelModel.find();
  }


  async findOne(model: string) {
    let printerModel: PrinterModel
    printerModel = await this.printerModelModel.findOne({name: model})
    if(!printerModel) throw new NotFoundException(`El modelo no existe`)
    return printerModel;
  }


  async update(model: string, updatePrinterModelDto: UpdatePrinterModelDto) {
    const printerModel = await this.findOne(model);
    try {
      await printerModel.updateOne(updatePrinterModelDto, {new: true});
      return {...printerModel.toJSON(), ...updatePrinterModelDto}
    } catch (error) {
      this.handleExceptions(error)
    }
  }


  async remove(id: string) {
    const { deletedCount } = await this.printerModelModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Modelo no existe`);
    return
  }


  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`El modelo existe en la base de datos`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puede crear el modelo revise los logs en el server`)
  }
}

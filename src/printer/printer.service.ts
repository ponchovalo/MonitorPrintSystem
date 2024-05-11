import { BadRequestException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';
import { Model } from 'mongoose';
import { Printer } from './entities/printer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PrinterModelService } from 'src/printer-model/printer-model.service';
import { PrinterModel } from 'src/printer-model/entities/printer-model.entity';

@Injectable()
export class PrinterService {

  constructor(
    @InjectModel(Printer.name)
    private readonly printermodel: Model<Printer>,
    private readonly printerModelService: PrinterModelService
  ){}


  async create(createPrinterDto: CreatePrinterDto) {

    const printerModel: PrinterModel = await this.printerModelService.findOne(createPrinterDto.printerModel);

    try {
      const newPrinter = {
        printerName: createPrinterDto.printerName,
        printerBrand: printerModel.brand,
        printerModel: printerModel.name,
        printerSerie: createPrinterDto.printerSerie,
        printerType: printerModel.type,
        printerIp: createPrinterDto.printerIp,
        printerMac: createPrinterDto.printerMac,
        printerBuilding: createPrinterDto.printerBuilding,
        printerLocation: createPrinterDto.printerLocation,
        printerCountOids: printerModel.countOids,
        printerLevelOids: printerModel.levelOids,
      }
      const printer = await this.printermodel.create(newPrinter)
      return newPrinter
    } catch (error) {
      this.handleExceptions(error)
    }
    
  }

  findAll() {
    return this.printermodel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} printer`;
  }

  update(id: number, updatePrinterDto: UpdatePrinterDto) {
    return `This action updates a #${id} printer`;
  }

  remove(id: number) {
    return `This action removes a #${id} printer`;
  }
  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`La impresora existe en la base de datos`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puede crear el modelo revise los logs en el server`)
  }
}

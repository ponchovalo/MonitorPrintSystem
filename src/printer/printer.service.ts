import { BadRequestException, InternalServerErrorException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';
import { Model } from 'mongoose';
import { Printer } from './entities/printer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PrinterModelService } from 'src/printer-model/printer-model.service';
import { PrinterModel } from 'src/printer-model/entities/printer-model.entity';
import { Oid } from 'src/printer-model/interfaces/oid.interface';


@Injectable()
export class PrinterService {

  constructor(
    @InjectModel(Printer.name)
    private readonly printermodel: Model<Printer>,
    private readonly printerModelService: PrinterModelService
  ){}

  snmp = require("net-snmp")

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

  async findOne(id: string) {
    let printer: Printer;
    printer = await this.printermodel.findById(id);
    if(!printer) throw new NotFoundException(`La impresora no existe`)
    return printer;
  }

  update(id: number, updatePrinterDto: UpdatePrinterDto) {
    return `This action updates a #${id} printer`;
  }

  remove(id: number) {
    return `This action removes a #${id} printer`;
  }

  async getPrinterDetail(id: string){
    const printer: Printer = await this.findOne(id);
    
    return this.printerDetail(printer);
  }

  private async printerDetail(printer: Printer){
    let oidValues: Oid;
    let { printerCountOids } = printer;

    

    

    const session = this.snmp.createSession(printer.printerIp, "public");
    session.get([printerCountOids[0].oid], (error: any, varbinds:any) => {
      if(error){
        console.log(error)
      }else{
        console.log(varbinds[0])
        oidValues = {
          name: printerCountOids[0].name,
          oid: printerCountOids[0].oid,
          value: varbinds[0].value
        }
        console.log(oidValues)
        printer.printerCountOids[0] = oidValues;
      }
    })
    
  }

  private handleExceptions(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`La impresora existe en la base de datos`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puede crear el modelo revise los logs en el server`)
  }
}

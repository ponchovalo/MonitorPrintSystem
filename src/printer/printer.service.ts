import { BadRequestException, InternalServerErrorException, Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CreatePrinterDto } from './dto/create-printer.dto';
import { UpdatePrinterDto } from './dto/update-printer.dto';
import { Model } from 'mongoose';
import { Printer } from './entities/printer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PrinterModelService } from 'src/printer-model/printer-model.service';
import { PrinterModel } from 'src/printer-model/entities/printer-model.entity';
import { Oid } from 'src/printer-model/interfaces/oid.interface';
import { PrinterResponse } from './interfaces/printer-response.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PrinterService {

  constructor(
    @InjectModel(Printer.name)
    private readonly printermodel: Model<Printer>,
    private readonly printerModelService: PrinterModelService
  ) { }
  private readonly snmp = require("net-snmp")

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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offSet = 0 } = paginationDto;

    let printers: Printer[] = await this.printermodel.find()
      .limit(limit)
      .skip(offSet)
      .sort({ printerSerie: 1 })
      
    return { printers, paginationDto }
  }

  async findOne(id: string) {
    let printer: Printer;
    printer = await this.printermodel.findById(id);
    if (!printer) throw new NotFoundException(`La impresora no existe`)
    return printer;
  }

  async update(id: string, updatePrinterDto: UpdatePrinterDto) {
    const printer = await this.printermodel.findById(id);
    try {
      await printer.updateOne(updatePrinterDto, { new: true })
      return { ...printer.toJSON(), ...updatePrinterDto }
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.printermodel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new BadRequestException(`Printer with id ${id} not found`);
    return
  }

  async getAllDetails(paginationDto: PaginationDto): Promise<PrinterResponse[]> {
    const { limit = 10, offSet = 0 } = paginationDto;
    const idList: string[] = [];
    let printerList: PrinterResponse[] = [];
    (await this.printermodel.find({}, "_id")
      .limit(limit)
      .skip(offSet)
      .sort({ printerSerie: -1 }))
      .map(id => idList.push(id._id));
      
    for (let i = 0; i < idList.length; i++) {
      let printer: PrinterResponse = await this.getPrinterDetail(idList[i]);
      printerList.push(printer)
    }
    return printerList;
  }

  async getPrinterDetail(id: string) {
    const printer: Printer = await this.findOne(id);
    const { printerCountOids, printerLevelOids, printerIp, ...dataPrinter } = printer
    let printerResponse: Printer | PrinterResponse = {
      printerName: printer.printerName,
      printerBrand: printer.printerBrand,
      printerModel: printer.printerModel,
      printerSerie: printer.printerSerie,
      printerType: printer.printerType,
      printerIp: printer.printerIp,
      printerMac: printer.printerMac,
      printerBuilding: printer.printerBuilding,
      printerLocation: printer.printerLocation,
      printerCountOids: await this.getOidValues(printerIp, printerCountOids),
      printerLevelOids: await this.getOidValues(printerIp, printerLevelOids),
      messageStatus: "ONLINE"
    };
    if (printerResponse.printerCountOids[0].value === 0 && printerResponse.printerLevelOids[0].value === 0) {
      printerResponse.messageStatus = "NOT ONLINE"
    }
    return printerResponse
  }

  private getOidValues(ip: string, oids: Oid[]) {
    //Resultado oids
    let oidResult: Oid[] = [];
    //Creacion de Array de Oids
    let oidString: string[] = []
    oids.map(oid => oidString.push(oid.oid))

    //Obtiene Datos de SNMP
    const consult = new Promise((resolve, reject) => {
      //Modificamos opciones
      let options = {
        port: 161,
        retries: 2,
        timeout: 500,
        backoff: 1.0,
        transport: "udp4",
        trapPort: 162,
        version: this.snmp.Version1,
        backwardsGetNexts: true,
        reportOidMismatchErrors: false,
        idBitsSize: 32
      };
      //Crea sesion
      let session = this.snmp.createSession(ip, "public", options);
      //Solicita Informacion
      session.get(oidString, function (error, varbinds) {
        if (error) {
          console.log(error)
          return reject(error)
        } else {
          //Recorre el arreglo resultante
          for (let i = 0; i < varbinds.length; i++) {
            let oid: Oid = {
              name: oids[i].name,
              oid: oids[i].oid,
              value: varbinds[i].value,
              color: oids[i].color ? oids[i].color : undefined
            }
            oidResult.push(oid)
          }
          return resolve(oidResult)
        }
        session.close()
      })
    }).catch((varbinds) => {
      //Recorre los oids para asignar 0
      for (let i = 0; i < oids.length; i++) {
        let oid: Oid = {
          name: oids[i].name,
          oid: oids[i].oid,
          value: 0,
          color: oids[i].color ? oids[i].color : undefined
        }
        oidResult.push(oid)
      }
      console.log(varbinds)
    })

    return consult.then(() => { 
      return oidResult 
    })
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`La impresora existe en la base de datos`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se puede crear el modelo revise los logs en el server`)
  }
}

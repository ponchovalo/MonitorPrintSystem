import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrinterModelService } from './printer-model.service';
import { CreatePrinterModelDto } from './dto/create-printer-model.dto';
import { UpdatePrinterModelDto } from './dto/update-printer-model.dto';

@Controller('printer-model')
export class PrinterModelController {
  constructor(private readonly printerModelService: PrinterModelService) {}

  @Post()
  create(@Body() createPrinterModelDto: CreatePrinterModelDto) {
    return this.printerModelService.create(createPrinterModelDto);
  }

  @Get()
  findAll() {
    return this.printerModelService.findAll();
  }

  @Get(':model')
  findOne(@Param('model') model: string) {
    return this.printerModelService.findOne(model);
  }

  @Patch(':model')
  update(@Param('model') model: string, @Body() updatePrinterModelDto: UpdatePrinterModelDto) {
    return this.printerModelService.update(model, updatePrinterModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printerModelService.remove(id);
  }
}

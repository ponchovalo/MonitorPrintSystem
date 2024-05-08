import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrintModelService } from './print-model.service';
import { CreatePrintModelDto } from './dto/create-print-model.dto';
import { UpdatePrintModelDto } from './dto/update-print-model.dto';

@Controller('print-model')
export class PrintModelController {
  constructor(private readonly printModelService: PrintModelService) {}

  @Post()
  create(@Body() createPrintModelDto: CreatePrintModelDto) {
    return this.printModelService.create(createPrintModelDto);
  }

  @Get()
  findAll() {
    return this.printModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.printModelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrintModelDto: UpdatePrintModelDto) {
    return this.printModelService.update(+id, updatePrintModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printModelService.remove(+id);
  }
}

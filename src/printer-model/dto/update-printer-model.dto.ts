import { PartialType } from '@nestjs/mapped-types';
import { CreatePrinterModelDto } from './create-printer-model.dto';

export class UpdatePrinterModelDto extends PartialType(CreatePrinterModelDto) {}

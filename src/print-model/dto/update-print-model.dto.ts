import { PartialType } from '@nestjs/mapped-types';
import { CreatePrintModelDto } from './create-print-model.dto';

export class UpdatePrintModelDto extends PartialType(CreatePrintModelDto) {}

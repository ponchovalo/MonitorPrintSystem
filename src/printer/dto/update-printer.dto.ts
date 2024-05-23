import { PartialType } from '@nestjs/mapped-types';
import { CreatePrinterDto } from './create-printer.dto';
import { Oid } from 'src/printer-model/interfaces/oid.interface';
import { IsArray, IsOptional } from 'class-validator';

export class UpdatePrinterDto extends PartialType(CreatePrinterDto) {

    @IsArray()
    @IsOptional()
    printerCountOids?: Oid[];

    @IsArray()
    @IsOptional()
    printerLevelOids?: Oid[];


}

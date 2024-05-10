import { IsArray, IsString } from "class-validator";
import { Oid } from "src/printer-model/interfaces/oid.interface";

export class CreatePrinterDto {


    @IsString()
    printerName: string;
    
    @IsString()
    printerModel: string;

    @IsString()
    printerSerie: string;

    @IsString()
    printerIp: string;

    @IsString()
    printerMac: string;

    @IsString()
    printerBuilding: string;

    @IsString()
    printerLocation: string;

}

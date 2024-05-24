import { IsString } from "class-validator";

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

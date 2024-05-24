import { Type } from "class-transformer";
import { IsInt, IsNumber, IsString } from "class-validator";

export class CreateStoreDto {
    
    @IsString()
    partName: string;

    @IsString()
    partDescription: string;

    @IsString()
    partPrinterModel: string;

    @IsString()
    partType: string;

    @IsString()
    partNumber: string;

    @IsString()
    partCode: string;

    @IsNumber()
    @Type(()=> Number)
    partStock: number;
}

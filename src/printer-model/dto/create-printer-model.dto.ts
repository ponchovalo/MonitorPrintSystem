import { IsArray, IsString } from "class-validator";
import { Oid } from "../interfaces/oid.interface";

export class CreatePrinterModelDto {

    @IsString()
    brand: string;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsArray()
    countOids: Oid[];

    @IsArray()
    levelOids: Oid[];

}

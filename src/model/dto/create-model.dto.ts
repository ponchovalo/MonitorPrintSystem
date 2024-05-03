import { IsArray, IsString } from "class-validator";
import { CountOid } from "../interfaces/count-oid.interface";
import { LevelOid } from "../interfaces/level-oid.interface";

export class CreateModelDto {

    @IsString()
    brand: string;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsArray()
    countOids: CountOid[];

    @IsArray()
    levelOids: LevelOid[];



}

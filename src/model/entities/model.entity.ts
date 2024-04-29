import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CountOid } from "../interfaces/count-oid.interface";
import { LevelOid } from "../interfaces/level-oid.interface";

@Schema()
export class Model {

    @Prop({required: true})
    brand: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true})
    countOids: CountOid[];

    @Prop({required: true})
    levelOids: LevelOid[];
}

export const ModelSchema = SchemaFactory.createForClass(Model);

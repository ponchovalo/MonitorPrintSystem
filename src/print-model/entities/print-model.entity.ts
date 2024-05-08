import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { Oid } from "../interfaces/oid.interface";

@Schema()
export class PrintModel{

    @Prop({required: true})
    brand: string;

    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true})
    countOids: Oid[];

    @Prop({required: true})
    levelOids: Oid[];

}

export const PrintModelSchema = SchemaFactory.createForClass(PrintModel)

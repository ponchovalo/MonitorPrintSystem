import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Oid } from "../interfaces/oid.interface";

@Schema()
export class PrinterModel extends Document {

    @Prop()
    brand: string;

    @Prop({unique: true, index: true})
    name: string;

    @Prop()
    type: string;

    @Prop()
    countOids: Oid[];

    @Prop()
    levelOids: Oid[];

}

export const PrinterModelSchema = SchemaFactory.createForClass(PrinterModel)

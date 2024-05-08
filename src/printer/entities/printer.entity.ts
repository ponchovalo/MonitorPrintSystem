import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PrintModel } from "src/print-model/entities/print-model.entity";

@Schema()
export class Printer {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    model: PrintModel;

    @Prop({required: true, unique: true})
    serie: string;
    
    @Prop({required: true, unique: true})
    ip: string;

    @Prop({required: true, unique: true})
    mac: string;

    @Prop({required: true})
    building: string;

    @Prop({required: true})
    location: string;

}

export const PrinterSchema = SchemaFactory.createForClass(Printer);
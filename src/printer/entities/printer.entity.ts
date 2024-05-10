import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Oid } from "src/printer-model/interfaces/oid.interface";
import { Document } from "mongoose";

@Schema()
export class Printer extends Document {

    @Prop({unique: true})
    printerName: string;

    @Prop()
    printerBrand: string;

    @Prop()
    printerModel: string;

    @Prop({unique: true})
    printerSerie: string;

    @Prop()
    printerType: string;

    @Prop({unique: true})
    printerIp: string;

    @Prop({unique: true})
    printerMac: string;

    @Prop()
    printerBuilding: string;

    @Prop()
    printerLocation: string;

    @Prop()
    printerCountOids: Oid[];

    @Prop()
    printerLevelOids: Oid[];

}

export const PrinterSchema = SchemaFactory.createForClass(Printer)

import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Store extends Document {

    @Prop({unique: true})
    partName: string;

    @Prop()
    partDescription: string;

    @Prop()
    partPrinterModel: string;

    @Prop()
    partType: string;

    @Prop({unique: true})
    partNumber: string;

    @Prop({unique: true})
    partCode: string;

    @Prop()
    partStock: number;

}

export const StoreSchema = SchemaFactory.createForClass(Store);
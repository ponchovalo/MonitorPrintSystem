import { Oid } from "src/printer-model/interfaces/oid.interface";
export interface PrinterResponse {
    printerName: string;
    printerBrand: string;
    printerModel: string;
    printerSerie: string;
    printerType: string;
    printerIp: string;
    printerMac: string;
    printerBuilding: string;
    printerLocation: string;
    printerCountOids: Oid[];
    printerLevelOids: Oid[];
    messageStatus: string;
}
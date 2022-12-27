import { Page, Browser } from "playwright";

export type DNI = string | number;

export type Field = {
  name: string;
  label: string;
  show?: boolean;
};
export type PageAndBrowser = {
  page?: Page;
  browser: Browser;
  error?: any;
};

export type Record = {
  cedula: DNI;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  cc: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  nacionalidad: string;
  leyendaMarginal: string;
  empadronado: string;
  fallecido: boolean | string;
  nombrePadre: string;
  cedulaPadre: DNI;
  nombreMadre: string;
  cedulaMadre: DNI;
};

export type TSEContext = {
  url: string;
  fields: Field[];
  page: Page;
  browser: Browser;
};

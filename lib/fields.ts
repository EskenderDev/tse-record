import { Field } from "@/types";

export const fields: Field[] = [
  { name: "cedula", label: "#lblcedula", show: true },
  { name: "nombre", label: "#lblnombre", show: true },
  { name: "primerApellido", label: "#lblprimer_apellido", show: true },
  { name: "segundoApellido", label: "#lblsegundo_apellido", show: true },
  { name: "cc", label: "#lblconocido_como", show: true },
  { name: "fechaNacimiento", label: "#lblfecha_nacimiento", show: true },
  { name: "lugarNacimiento", label: "#lbllugar_nacimiento", show: true },
  { name: "nacionalidad", label: "#lblnacionalidad", show: true },
  { name: "leyendaMarginal", label: "#lblLeyendaMarginal", show: true },
  { name: "empadronado", label: "#lblempadronado", show: true },
  { name: "fallecido", label: "#lblfallecido", show: true },
  { name: "nombrePadre", label: "#lblnombre_padre", show: true },
  { name: "cedulaPadre", label: "#lblid_padre", show: true },
  { name: "nombreMadre", label: "#lblnombre_madre", show: true },
  { name: "cedulaMadre", label: "#lblid_madre", show: true },
];

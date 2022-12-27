import { BASE_URL, DNI_PATH_NAME } from "./config";
import { fields } from "@/fields";
import TSERecord from "@/TSERecord";
import { DNI, Record } from "@/types";

export async function findRecord(dni: DNI): Promise<Record> {
  const url = `${BASE_URL}/${DNI_PATH_NAME}.aspx`;
  const tseRecord = await TSERecord.setup(url, fields);
  return await tseRecord.getRecordByDNI(dni);
}

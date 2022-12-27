import { afterAll, beforeAll, describe, expectTypeOf, it } from "vitest";
import { BASE_URL, DNI_PATH_NAME } from "@/config";
import { fields } from "@/fields";

import TSERecord from "@/TSERecord";
import { DNI, Record } from "./types";

describe("TSERecord", () => {
  const DNI_MOCK = "206450557";
  let tseRecord: TSERecord;
  let record: Record;

  beforeAll(async () => {
    const url = `${BASE_URL}/${DNI_PATH_NAME}.aspx`;
    tseRecord = await TSERecord.setup(url, fields);
    record = await tseRecord.getRecordByDNI(DNI_MOCK);
  });

  afterAll(async () => {
    await tseRecord.close();
  });

  it("Should be TSERecord type", () => {
    expectTypeOf<TSERecord>(tseRecord);
  });

  it("Some record fields should be a strings", async () => {
    expectTypeOf(record.nombre).toBeString();
    expectTypeOf(record.cc).toBeString();
    expectTypeOf(record.nacionalidad).toBeString();
  });

  it("Some record fields should be a DNI type", () => {
    expectTypeOf<DNI>(record.cedula);
  });
});

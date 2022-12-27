import { Browser, BrowserContext, chromium, Page } from "playwright";
import { HEADLESS } from "@/config";
import { DNI, Field, Record, TSEContext } from "@/types";

export default class TSERecord {
  private _browser: Browser;
  private _fields: Field[];
  private _record?: Record;
  private _page: Page;
  private _url: string;

  constructor(context: TSEContext) {
    const { url, fields, page, browser } = context;
    this._url = url;
    this._fields = fields;
    this._page = page;
    this._browser = browser;
  }
  public get record(): Record {
    return this._record as Record;
  }

  public static async setup(url: string, fields: Field[]): Promise<TSERecord> {
    const browser: Browser = await chromium.launch({ headless: HEADLESS });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await context.route("**.[png,jpg,jpeg,gif,do,ico,css]", (route) =>
      route.abort()
    );

    return new TSERecord({ browser, page, url, fields });
  }

  public async getRecordByDNI(dni: DNI): Promise<any> {
    this._page?.goto(this._url);

    const inputDNI = await this._page?.getByPlaceholder(
      "Digite el número de cédula ahora"
    );

    await inputDNI?.fill(`${dni}`);
    await this._page?.getByRole("button").click();

    await this._page?.getByText("Ver Más Detalles").click();
    await this._page?.waitForNavigation();
    return this._getPageData(this._fields);
  }

  public close() {
    this._browser.close();
  }

  private async _getPageData(fields?: Field[]) {
    if (fields?.length) {
      let data = await Promise.all(
        fields.map(async (field: Field) => {
          return [
            field.name,
            await this._page.locator(field.label).textContent(),
          ];
        })
      );

      return Object.fromEntries(data);
    }
  }
}

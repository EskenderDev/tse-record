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
  public get url(): string {
    return this._url;
  }
  public static async setup(url: string, fields: Field[]): Promise<TSERecord> {
    const browser: Browser = await chromium.launch({ headless: HEADLESS });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await context.route("**.[png,jpg,jpeg,gif,do,ico,css]", (route) =>
      route.abort()
    );
    await page.goto(url);

    return new TSERecord({ browser, page, url, fields });
  }

  public async getRecordByDNI(dni: DNI): Promise<any> {
    const inputDNI = await this._page?.getByPlaceholder(
      "Digite el número de cédula ahora"
    );

    await inputDNI?.fill(`${dni}`);
    await this._page?.getByRole("button").click();

    await this._page?.getByText("Ver Más Detalles").click();
    await this._page?.waitForNavigation();

    return this._getPageData(this._fields);
  }

  private _close() {
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
      this._close();
      return Object.fromEntries(data);
    }
  }
}

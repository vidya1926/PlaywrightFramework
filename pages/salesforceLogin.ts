import { BrowserContext, Page, expect } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright";

export class SalesforceLogin extends PlaywrightWrapper{
static pageUrl = URLConstants.instanceURL;

constructor(page: Page,context:BrowserContext) {
    super(page,context);
    this.loadApp(SalesforceLogin.pageUrl);
}
public async salesforceLogin(username:string,password:string){
    await this.type("#username","Username",username);
    await this.type("#password","password",password);
    await this.click("#Login","Sign In","Button");
    await this.validateElementVisibility(".slds-icon-waffle","App Launcher")
    await this.storeState("./logins/salesforce.json")
}

}
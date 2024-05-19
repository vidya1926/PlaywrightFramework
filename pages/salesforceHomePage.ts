import { Page, Locator, BrowserContext } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";
import { credentialConstants } from "../constants/CredentialConstants";

import { SalesforceLogin } from "./salesforceLogin";

export class SalesforceHomePage extends PlaywrightWrapper {

    static pageUrl = URLConstants.instanceURL;
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.common(page, context);
    }
    public async common(page: Page, context: BrowserContext) {
        await this.loadApp(SalesforceHomePage.pageUrl);
        await this.maxWait(5000)
        let pageTitle = await this.getTitle();
        console.log(pageTitle)
        if (pageTitle.startsWith("Login")) {
            const sfLogin = new SalesforceLogin(page, context);
            await sfLogin.salesforceLogin(credentialConstants.USERNAME, credentialConstants.PASSWORD);
            
        }
    }
    public async appLauncher() {
        await this.validateElementVisibility(".slds-icon-waffle", "App Launcher")
        await this.click(".slds-icon-waffle", "App Launcher", "Button")
    }

    public async viewAll(){
        await this.waitForSelector('//button[text()="View All"]')
        await this.click('//button[text()="View All"]',"View All","Button")
    }

    public async searchApp(value:string){
        await this.type("one-app-launcher-modal input.slds-input","Search Field",value)
    }

    public async app(value:string){
        await this.click("//mark[text()='"+value+"']",value,"Button")
    }
}
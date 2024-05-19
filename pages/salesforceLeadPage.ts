import { Page, Locator, BrowserContext } from "@playwright/test";
import { SalesforceHomePage } from "./salesforceHomePage";


export class SalesforceLeadPage extends SalesforceHomePage {

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }
    public async newButton(){
        await this.validateElementVisibility("div:text-is('New')","New Button")
        await this.click("div:text-is('New')","New","Button")
    }
    public async salutation(value:string){
        await this.click("button[name='salutation']","Salutation","Button")
        await this.click("span:text-is('"+value+"')","Salutation Value","Button")
    }

    public async firstName(value:string){
        await this.type("//label[text()='First Name']//following::input[1]","First Name",value)
    }

    public async lastName(value:string){
        await this.type("//label[text()='Last Name']//following::input[1]","Last Name",value)
    }

    
    public async Company(value:string){
        await this.type("//label[text()='Company']//following::input[1]","Last Name",value)
    }

    public async saveButton(){
        await this.click("//button[text()='Save']","Save","Button")
    }

    public async verifiTheLeadAccount(expectedValue:string){
        await this.validateElementVisibility("slot[name='primaryField'] lightning-formatted-name","Lead Name")
        const leadName = await this.getInnerText("slot[name='primaryField'] lightning-formatted-name") 
        console.log(leadName)
        await this.verification("slot[name='primaryField'] lightning-formatted-name",expectedValue)
       }

    public async searchLead(value:string){
        await this.validateElementVisibility("div[class^='slds-form-element__control'] input","Search Field")
        await this.typeAndEnter("div[class^='slds-form-element__control'] input","Search Field",value)
    }

    public async leadID(userName:string){
        await this.spinnerDisappear()
        await this.click("//a[text()='"+userName+"']",userName,"User Name")
    }

    public async expandButton(){
        await this.click("[class^='menu-button-item'] button","Expand Button","Button")
    }

    public async deleteLead(){
        await this.validateElementVisibility("span:text-is('Delete')","Delete")
        await this.click("span:text-is('Delete')","Delete","Button")
    }

    public async deletePopUP(){
        await this.click("//button/span[text()='Delete']","Delete","Button")
    }

    public async verifiTheDeletedData(){
        await this.page.waitForLoadState('load')
        await this.verification("//span[text()='No items to display.']","No items to display")
    }
}
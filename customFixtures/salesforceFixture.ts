import { test as baseTest } from '@playwright/test'

import { credentialConstants } from "../constants/CredentialConstants";
import { SalesforceLogin } from '../pages/salesforceLogin'
import { SalesforceHomePage } from '../pages/salesforceHomePage'
import { SalesforceLeadPage } from '../pages/salesforceLeadPage'



type salesforceFixture = {
    SalesforceLogin: SalesforceLogin
    SalesforceHomePage: SalesforceHomePage
    SalesforceLeadPage:SalesforceLeadPage
}


export const test = baseTest.extend<salesforceFixture>({
    SalesforceLogin: async ({ page, context }, use) => {
        const sfLogin = new SalesforceLogin(page, context);
        await sfLogin.salesforceLogin(credentialConstants.USERNAME, credentialConstants.PASSWORD)
        console.log("Login is verified")
      //await sfLogin.storeState("../logins/salesforce.json")
        await use(sfLogin);
    },
    SalesforceHomePage: async ({ page, context }, use) => {
        const sfHome = new SalesforceHomePage(page, context)
        await use(sfHome)
    },
    SalesforceLeadPage: async ({ page, context }, use) => {
        const sfLead = new SalesforceLeadPage(page, context)
        await use(sfLead)
    },
    
})
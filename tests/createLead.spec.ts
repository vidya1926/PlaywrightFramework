import {test} from "../customFixtures/salesforceFixture"
import {FakerData} from "../utils/fakerUtils"

let firstName = FakerData.getFirstName()
test.use({ storageState: "logins/salesforce.json" })
test(` creating Lead`, async ({SalesforceHomePage,SalesforceLeadPage }) => {

    await SalesforceHomePage.appLauncher();
    await SalesforceHomePage.viewAll();
    await SalesforceHomePage.searchApp("Leads");
    await SalesforceHomePage.app("Leads");
    await SalesforceLeadPage.newButton();
    await SalesforceLeadPage.salutation("Mr.");
    await SalesforceLeadPage.firstName(firstName);
    await SalesforceLeadPage.lastName(FakerData.getLastName());
    await SalesforceLeadPage.Company(FakerData.companyName());
    await SalesforceLeadPage.saveButton();
    await SalesforceLeadPage.verifiTheLeadAccount(firstName)

})
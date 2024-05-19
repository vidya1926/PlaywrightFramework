import {getLead} from "../api_Integration/getLead"
import { test } from "../customFixtures/salesforceFixture";

test.use({ storageState: "logins/salesforce.json" });

test(`Deleting the LeadID created from an API request`, async ({ SalesforceHomePage, SalesforceLeadPage }) => {
    const userName = await getLead()
    await SalesforceHomePage.appLauncher();
    await SalesforceHomePage.viewAll();
    await SalesforceHomePage.searchApp("Leads");
    await SalesforceHomePage.app("Leads");
    await SalesforceLeadPage.searchLead(userName);
    await SalesforceLeadPage.leadID(userName);
    await SalesforceLeadPage.expandButton();
    await SalesforceLeadPage.deleteLead();
    await SalesforceLeadPage.deletePopUP();
    await SalesforceLeadPage.searchLead(userName);
    await SalesforceLeadPage.verifiTheDeletedData();
});

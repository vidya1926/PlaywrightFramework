import { test } from '../customFixtures/salesforceFixture';


test(`Login to Salesforce`, async ({ SalesforceLogin }) => {
  const title = await SalesforceLogin.getTitle();
  console.log(title)
})
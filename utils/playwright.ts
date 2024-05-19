import { hr } from "@faker-js/faker";
import { Page, test, expect, BrowserContext } from "@playwright/test";
import * as path from 'path';


declare module '@playwright/test' {
    interface Page {
        delayedFill: (selector: string, value: string) => Promise<void>;
        clickAndDelay: (selector: string) => Promise<void>;
    }

}

export abstract class PlaywrightWrapper {

    readonly page: Page;
    readonly context: BrowserContext

    index: number
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }
    /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async type(locator: string,
        name: string,
        data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).fill(data);

        });
    }
    /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async typeAndEnter(locator: string,
        name: string,
        data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            await this.page.locator(locator).clear();
            await this.page.locator(locator).fill(data);
            await this.page.keyboard.press("Enter");

        });
    }
    /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
    async click(locator: string,
        name: string,
        type: string
    ) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            await this.page.locator(locator).nth(0).click({ force: true });
        });
    }
    async storeState(path: string) {
        await this.page.context().storageState({ path: path })
    }
    async loadApp(url: string) {
        try {
            await test.step(`The URL ${url} loaded`, async () => {
                await this.page.goto(url, { timeout: 60000 }); // Increased timeout
            });
        } catch (error) {
            console.error('Error loading the page:', error);
        }
    }
    async getInnerText(locator: string): Promise<string> {
        return await this.page.locator(locator).innerText();
    }
    async getText(locator: string): Promise<string> {
        return await this.page.locator(locator).inputValue();

    }
    async spinnerDisappear() {
        const spinner = this.page.locator("//div[@class='slds-spinner_container slds-grid']");
        await expect(spinner).toHaveCount(0);
        console.log("expected element is disabled");
    }
    
    async getTitle() {
        try {
            const pageTitle = await this.page.title()
            return pageTitle
        } catch (error) {
            if (error.message.includes('Execution context was destroyed')) {
                console.error('Error: Execution context was destroyed. Retrying...');
                await this.page.waitForLoadState('load');
                return await this.page.title();
            } else {
                console.error('An unexpected error occurred:', error);
                throw error;
            }
        }
    }

    async waitForSelector(locator: string) {
        await this.page.waitForSelector(locator)
    }

    async multipleWindowsCount(): Promise<number> {
        const windowslength = this.page.context().pages().length;
        return windowslength;
    }

    async fillwithDelay(locator: string, inputValues: string) {
        await this.page.delayedFill(locator, inputValues)
    }

    async clickwithDelay(locator: string) {
        await this.page.clickAndDelay(locator);
    }
    async switchToWindowWithTitle(windowTitle: string) {
        const [multiPage] = await Promise.all([
            this.context.waitForEvent('page'),
        ]);
        const pages = multiPage.context().pages();

        console.log(`Number of pages opened: ${pages.length}`);

        for (const page of pages) {
            const url = page.url();
            console.log(`URL of the page is : ${url}`);

            const title = await page.title();
            console.log(`Title of the page: ${title}`);

            if (title === windowTitle) {
                console.log(`Switching to the page with title: ${windowTitle}`);
                await page.bringToFront();
                return page;
            }
        }
        console.log(`No page found with title: ${windowTitle}`);
        return null;
    }

    async acceptAlert(Data: string) {
        this.page.on("dialog", async (dialog) => {
            dialog.message()
            await dialog.accept(Data);
            console.log('Dialog Message:', dialog.message());
        });
    }
    //i:number;
    async clickinFrame(frameLocator: string, locator: string, name: string, type: string, index: number) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            const frameCount = 1;
            await this.page.locator(frameLocator).count();
            if (frameCount > 0) {
                await this.page.frameLocator(frameLocator).locator(locator).nth(index).click({ force: true });
            } else {
                await this.page.locator(locator).click({ force: true });
            }
        })
    }
    async typeinFrame(flocator: string, locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            const frameCount = 1;
            if (frameCount > 0) {
                await this.page.frameLocator(flocator).locator(locator).clear();
                await this.page.frameLocator(flocator).locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            } else {
                await this.page.locator(locator).clear();
                await this.page.locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            }
        });
    }

    async mouseHoverandClick(hoverLocator: string, clickLocator: string, Menu: string, name: string) {
        await test.step(`The ${Menu} ${name} clicked`, async () => {
            await this.page.hover(hoverLocator);
            await this.page.click(clickLocator);

        })
    }

    async mouseHover(hoverLocator: string, Menu: string) {
        await test.step(`The pointer hovers over the ${Menu} element.  `, async () => {
            await this.page.hover(hoverLocator);
        })
    }

    async draganddrop(sourceLocator: string, targetLocator: string, sourceElement: string, targetElement: string) {
        await test.step(`The ${sourceElement} dragged  to ${targetElement} Succesfully`, async () => {
            const sourceElement = this.page.locator(sourceLocator)
            const targetElement = this.page.locator(targetLocator)
            await sourceElement.dragTo(targetElement)
        })
    }

    async keyboardAction(locator: string, keyAction: string, Menu: string, name: string) {
        await test.step(`The ${Menu} ${name} clicked`, async () => {
            await this.page.focus(locator)
            await this.page.keyboard.press(keyAction)
        })
    }

    async doubleClick(locator: string, name: string) {
        await test.step(`The ${name} clicked`, async () => {
            await this.page.locator(locator).click({ force: true })
            await this.page.locator(locator).click({ force: true })
        })
    }

    async verification(locator: string, expectedTextSubstring: string) {
        const element = this.page.locator(locator);
        const text = await element.innerText();
        console.log(text);
        expect(text).toContain(expectedTextSubstring);
        console.log(`Field value verified successfully`);
    }

    async waitForElementHidden(locator: string, type: string) {
        try {
            await this.page.waitForSelector(locator, { state: 'hidden', timeout: 20000 });
            console.log(`Element with XPath "${type}" is hidden as expected.`);
        } catch (error) {
            console.error(`Element with XPath "${type}" is still visible.`);
        }
    }


    async validateElementVisibility(locator: any, elementName: string) {
        const element = this.page.locator(locator);
        await this.page.waitForLoadState('load')
        await this.page.waitForSelector(locator, { state: 'visible', timeout: 20000 });
        if (await element.isVisible({ timeout: 20000 })) {
            console.log(`${elementName} is visible as expected.`);
        } else {
            console.error(`${elementName} is not visible.`);
        }
    }

    async uploadFile(locator: string, Path: string,) {
        const filePath = path.resolve(__dirname, Path);
        const inputElementHandle = this.page.locator(locator);
        if (inputElementHandle) {
            await inputElementHandle.setInputFiles(filePath);
        } else {
            console.error('Input element not found');
        }
    }

    async maxWait(value: number) {
        await this.page.waitForTimeout(value)
    }
}

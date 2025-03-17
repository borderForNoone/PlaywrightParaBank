import { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly categorySelector = 'text=Women';

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async selectCategory(category: string) {
        await this.page.locator(`text=${category}`).click();
    }
}
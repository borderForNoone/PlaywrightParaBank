import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pageobjects/HomePage';
import { LoginPage } from '../pageobjects/LoginPage';
import { UserDetails } from '../interfaces/UserDetails';
import { faker } from '@faker-js/faker';

type Product = {
    category: string;
    subcategory: string;
    productName: string;
};

const test = baseTest.extend<{
    loginPage: LoginPage,
    homePage: HomePage,
    product: Product,
    userData: UserDetails
}>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(process.env.EMAIL || 'default', process.env.PASSWORD || 'default');
        await loginPage.signInButton.waitFor({ state: 'hidden' });
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    product: async ({ }, use) => {
        const product = {
            category: 'Women',
            subcategory: 'Jackets',
            productName: 'Desired Product Name'
        };
        await use(product);
    },
    userData: async ({ }, use) => {
        const userData = {
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            zip: '01001',
            country: 'Ukraine',
            phone: faker.phone.number(),
        };
        await use(userData);
    }
});

export { test };
export { expect } from '@playwright/test';
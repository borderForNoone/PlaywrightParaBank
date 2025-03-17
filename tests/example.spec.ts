import { test, expect } from '../fixtures/testFixture';

const API_URL = 'https://your-api-endpoint.com'; 
const PARABANK_API_URL = 'https://parabank.parasoft.com/parabank';

async function registerUser(request, customerId) {
    const newAccountType = 1; // 1 - CHECKING, 2 - SAVINGS, 3 - LOAN 
    const fromAccountId = 67890;

    const response = await request.post(`${API_URL}/createAccount`, {
        params: {
            customerId,
            newAccountType,
            fromAccountId
        }
    });

    expect(response.status()).toBe(200);
    return response;
}

async function loginUser(request, username, password) {
    const response = await request.get(`${PARABANK_API_URL}/services/bank/login/${username}/${password}`);
    expect(response.status()).toBe(200);
    return response;
}

test('Register with valid data', async ({ request }) => {
    const response = await registerUser(request, 12345);
    const responseBody = await response.text();
    console.log('Response:', responseBody);
});

test('Login with valid data', async ({ request }) => {
    const username = 'john';
    const password = 'demo';
    
    const response = await loginUser(request, username, password);
    const responseBody = await response.text();
    console.log('Login Response:', responseBody);
});

async function createAccount(request, customerId, newAccountType, fromAccountId) {
    const response = await request.post(`${API_URL}/services/bank/createAccount`, {
        params: {
            customerId,
            newAccountType,
            fromAccountId
        }
    });
    expect(response.status()).toBe(200);
    return response;
}

test('Create new account', async ({ request }) => {
    const username = 'john';
    const password = 'demo';
    
    const customerId = await loginUser(request, username, password);
    expect(customerId).toBeDefined();
    
    const newAccountType = 1; // CHECKING
    const fromAccountId = 67890;
    
    const response = await createAccount(request, customerId, newAccountType, fromAccountId);
    const responseBody = await response.text();
    console.log('Account Creation Response:', responseBody);
});

async function transferFunds(request, fromAccountId, toAccountId, amount) {
    const response = await request.post(`${API_URL}/services/bank/transfer`, {
        params: {
            fromAccountId,
            toAccountId,
            amount
        }
    });
    expect(response.status()).toBe(200);
    return response;
}

test('Transfer funds between accounts', async ({ request }) => {
    const username = 'john';
    const password = 'demo';
    
    const customerId = await loginUser(request, username, password);
    expect(customerId).toBeDefined();
    
    const newAccountType = 1; // CHECKING
    const fromAccountId = await createAccount(request, customerId, newAccountType, 67890);
    const toAccountId = await createAccount(request, customerId, newAccountType, fromAccountId);
    
    const amount = 100.0;
    const response = await transferFunds(request, fromAccountId, toAccountId, amount);
    const responseBody = await response.text();
    console.log('Transfer Response:', responseBody);
});
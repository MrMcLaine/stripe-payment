const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
const router = require('../routes/userRoutes');
app.use('/', router);

const mockUser = {
    _id: '1',
    name: 'Test User',
    email: 'test@gmail.com',
    password: 'test123',
    stripeCustomerId: 'cus_test',
    subscriptionId: 'sub_test',
};

const mockToken = 'mockToken123';

jest.mock('../services/UserService', () => ({
    createUser: jest.fn(() => Promise.resolve(mockUser)),
    loginUser: jest.fn(() => Promise.resolve(mockUser)),
}));

jest.mock('../services/AuthService', () => ({
    generateToken: jest.fn(() => mockToken),
}));

jest.mock('stripe', () => () => ({
    customers: {
        create: jest.fn(() => Promise.resolve({ id: 'cus_test' })),
    },
}));

describe('POST /', () => {
    it('should create a new user and return 200 status', async () => {
        const res = await request(app).post('/').send(mockUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toEqual(
            expect.objectContaining({ name: mockUser.name })
        );
    });
});

describe('POST /login', () => {
    it('should log in an existing user and return 200 status', async () => {
        const res = await request(app)
            .post('/login')
            .send({ email: mockUser.email, password: mockUser.password });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toEqual(
            expect.objectContaining({ name: mockUser.name })
        );
        expect(res.body.token).toEqual(mockToken);
    });
});

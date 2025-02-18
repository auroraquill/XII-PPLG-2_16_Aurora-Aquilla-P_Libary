// File: tests/categories.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../config/database');

beforeAll(async () => {
    // Create users table if not exists
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

afterAll(async () => {
    await db.query('DELETE FROM users');
    await db.end();
});

describe('Users API', () => {
    let usersId;

    test('POST /api/users - Create user', async () => {
        const res = await request(app)
        .post('/api/users')
        .send({
            name: 'Test User',
            username: 'testuser',
            password: 'password123',
            email: 'testuser@example.com',
            phone: '1234567890'
        });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    usersId = res.body.id;
    });

    test('GET /api/users - Get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    });

    test('GET /api/users/:id - Get user by ID', async () => {
    const res = await request(app).get(`/api/users/${usersId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test User');
    });

    test('PUT /api/users/:id - Update user', async () => {
    const res = await request(app)
        .put(`/api/users/${usersId}`)
        .send({
        name: 'Updated User',
        username: 'updateduser',
        password: 'newpassword123',
        email: 'updateduser@example.com',
        phone: '0987654321'
    });

    expect(res.statusCode).toBe(200);
    });

    test('DELETE /api/users/:id - Delete user', async () => {
    const res = await request(app).delete(`/api/users/${usersId}`);
    expect(res.statusCode).toBe(200);
    });
});

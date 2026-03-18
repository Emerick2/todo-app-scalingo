const request = require('supertest');
const { app } = require('../src/server');
const db = require('../src/models/db');

beforeAll(async () => {
    await db.query('DELETE FROM todos');
});

afterAll(async () => {});

describe('API Todo App', () => {

    // 1. Test Health
    test('GET /api/health devrait retourner 200', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    // 2. Test GET Array
    test('GET /api/todos devrait retourner un tableau', async () => {
        const res = await request(app).get('/api/todos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    // 3. Test POST création
    test('POST /api/todos devrait créer une tâche', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({ title: "Tâche de test" });
        
        expect(res.statusCode).toBe(201);
        expect(res.body.data.title).toBe("Tâche de test");
    });

    // 4. Test POST rejet (Validation)
    test('POST /api/todos devrait rejeter une tâche sans titre', async () => {
        const res = await request(app)
            .post('/api/todos')
            .send({ title: "" });
        
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    // 5. Test 404
    test('GET /api/todos/:id devrait retourner 404 si inexistant', async () => {
        const res = await request(app).get('/api/todos/999999');
        expect(res.statusCode).toBe(404);
    });
});


/*
Pour tester :
./scalingo -a todo-app-staging --region osc-fr1 db-tunnel SCALINGO_POSTGRESQL_URL
npm test
*/

const request = require('supertest');
const app = require('../app');
let id;

test('GET /directors debe retornar status 200', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST /directors debe crear un director', async () => {
    const body = {
        firstName:"James",
        lastName:"Gunn",
        nationality:"American",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Facebook_F8_Developer%27s_Conference_2017_James_Gunn_%2833324520433%29_%28cropped%29.jpg/250px-Facebook_F8_Developer%27s_Conference_2017_James_Gunn_%2833324520433%29_%28cropped%29.jpg",
        birthday:"1966-08-05"
    };
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});
test('GET /directors/:id debe traer un director por su id', async () => {
    const res = await request(app).get(`/directors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});
test('GET /directors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).get('/directors/-1');
    expect(res.status).toBe(404);
});
test('PUT /directors/:id debe actualizar un director por su id', async () => {
    const body = {
        firstName:"James actualizado"
    };
    const res = await request(app).put(`/directors/${id}`).send(body);
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});
test('PUT /directors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/directors/-1');
    expect(res.status).toBe(404);
});
test('DELETE /dierectors/:id debe eliminar un director por su id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
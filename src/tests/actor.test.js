const request = require('supertest');
const app = require('../app');
let id;

test('GET /actors debe retornar status 200 al obtener actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST /actors debe crear un actor', async () => {
    const body ={
        firstName:"Dave",
        lastName:"Bautista",
        nationality:"American",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg/250px-Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg",
        birthday:"1969-01-19"
    };
    const res = await request(app).post('/actors').send(body);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
});
test('GET /actors/:id debe traer al actor por id', async () => {
    const res = await request(app).get(`/actors/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
});
test('GET /actors/:id con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).get('/actors/-1');
    expect(res.status).toBe(404);
});
console.log(`este esel id:${id}`)
test('PUT /actors/:id debe actualizar un actor por su id', async () => {
    const body ={
        firstName:"Dave actualizado"
    };
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});
test('PUT /actors/:id actualizar actor con id incorrecto debe retornar 404 ', async () => {
    const res = await request(app).put('/actors/-1');
    expect(res.status).toBe(404);
});
test('DELETE /actors/:id debe eliminar un actor por su id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
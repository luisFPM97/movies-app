const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
let id;

test('GET /movies debe retornar status 200', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST /movies debe crear una pelicula', async () => {
    const body = {
        name:"Guardianes de la galaxia",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Guardians_of_the_Galaxy_Logo_Black.svg/280px-Guardians_of_the_Galaxy_Logo_Black.svg.png",
        synopsis:"El temerario aventurero Peter Quill es objeto de un implacable cazarrecompensas después de robar una misteriosa esfera codiciada por Ronan, un poderoso villano cuya ambición amenaza todo el universo. Para poder escapar del incansable Ronan, Quill se ve obligado a pactar una complicada tregua con un cuarteto de disparatados inadaptados: Rocket, un mapache armado con un rifle, Groot, un humanoide con forma de árbol, la letal y enigmática Gamora y el vengativo Drax the Destroyer. Pero cuando Quill descubre el verdadero poder de la esfera, deberá hacer todo lo posible para derrotar a sus extravagantes rivales en un intento desesperado de salvar el destino de la galaxia.",
        releaseYear: 2014
    };
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});
test('GET /movies/:id debe traer la pelicula por su id', async () => {
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
});
test('PUT /movies/:id debe actualizar la pelicula por su id', async () => {
    const body = {
        name:"Guardianes de la galaxia actualizado"
    };
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});
test('POST /movies/:id/actors agrega los actores de la pelicula', async () => {
    const actor = await Actor.create({
        firstName:"Dave",
        lastName:"Bautista",
        nationality:"American",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg/250px-Dave_Bautista_Photo_Op_GalaxyCon_Minneapolis_2019.jpg",
        birthday:"1969-01-19"
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});
test('POST /movies/:id/directors agraga los directores a la pelicula', async () => {
    const director = await Director.create({
        firstName:"James",
        lastName:"Gunn",
        nationality:"American",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Facebook_F8_Developer%27s_Conference_2017_James_Gunn_%2833324520433%29_%28cropped%29.jpg/250px-Facebook_F8_Developer%27s_Conference_2017_James_Gunn_%2833324520433%29_%28cropped%29.jpg",
        birthday:"1966-08-05"
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});
test('POST /movies/:id/genres agrega los generos a la pelicula ', async () => {
    const genre = await Genre.create({
        name:"Ciencia ficción"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
});
test('DELETE /movies/:id debe eliminar una pelicula por su id', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});
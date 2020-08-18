import chai from 'chai';
import fs from 'fs';
import chaiHttp from 'chai-http';
import app from '../app';


const { expect } = chai;


chai.use(chaiHttp);

describe('Test for user endpoint', () => {
    describe('Test for POST route', () => {
        it('should return 201 and create user with single image upload', async() => {
            const res = await chai.request(app)
                .post('/users')
                .set('content-type', 'multipart/form-data')
                .field('email', 'myemail@gmail.com')
                .field('firstname', 'slim')
                .field('lastname', 'shady')
                .attach('image', fs.readFileSync(`${__dirname}/file.png`), 'tests/file.png')
                expect(res.status).to.equal(201);
                console.log('RES',res.body.data)
        })

        //anoter post test
        it('should return 201 and create user with multiple image upload', async() => {
            const res = await chai.request(app)
                .post('/users')
                .set('content-type', 'multipart/form-data')
                .field('email', 'busybody@gmail.com')
                .field('firstname', 'busy')
                .field('lastname', 'body')
                .attach('image', fs.readFileSync(`${__dirname}/file.png`), 'tests/file.png')
                .attach('image', fs.readFileSync(`${__dirname}/chris1.pdf`), 'tests/chris1.pdf')
                expect(res.status).to.equal(201);
                console.log('RES2', res.body.data)
        })
    })

    describe('Test for GET routes', () => {
        it('should return 200 and return all users in the db', async() => {
            const res = await chai.request(app)
                        .get('/users')
                        expect(res.status).to.equal(200);
                        console.log('RES3', res.body.data)
        })

        it('should return 200 and return user with the ID', async() => {
            const res = await chai.request(app)
                        .get(`/users/${1}`)
                        expect(res.status).to.equal(200);
                        console.log('RES4', res.body.data)
        })
    })
})
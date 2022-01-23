require('dotenv').config();
import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/');
const faker = require('faker');

//const TOKEN = '9d4edbc18e36c142873491cdb5b32adb5900ef989077ebf656dc2bf9dd504d64';
const TOKEN = process.env.USER_TOKEN;

export const createRandomUserWithFaker = async () => {
    const userData = {
        'email': faker.internet.email(),
        'name': faker.name.firstName(),
        'gender': 'male',
        'status': 'active'
    };

    const res = await request
        .post(`v1/users?access-token=${TOKEN}`)
        .send(userData)

    return res.body.data.id;

};

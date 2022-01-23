import supertest from "supertest";
const request = supertest('https://gorest.co.in/public/')
import { expect } from "chai";

const TOKEN = '9d4edbc18e36c142873491cdb5b32adb5900ef989077ebf656dc2bf9dd504d64';
describe('Users', ()=>{
    it('GET v1/users', ()=> {
        // request.get(`v1/users?access-token=${TOKEN}`).end((err, res) =>{
        //     expect(res.body.data).to.not.be.empty;
        //     done();
        // });

        return request.get(`v1/users?access-token=${TOKEN}`).then((res) =>{
            expect(res.body.data).to.not.be.empty;
        });
    });

    it('GET v1/users/:id', ()=> {
        return request.get(`v1/users/18?access-token=${TOKEN}`).then((res) =>{
            expect(res.body.data.id).to.be.eq(18);
        });
    });

    it('GET v1/users with query params', ()=> {
        const url = `v1/users?access-token=${TOKEN}?page=5&gender=female&status=active`;
        return request.get(url).then((res) =>{
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            });
        });
    });

    it('POST /users', () => {
        const data = {
            'email':`test${Math.floor(Math.random()*9999)}@gmail.com`,
            'name': 'Om',
            'gender': 'male',
            'status': 'active'
        };

        return request
            .post(`v1/users?access-token=${TOKEN}`)
            .send(data)
            .then((res) => {
                // console.log(res.body);
                // expect(res.body.data.email).to.eq(data.email);
                // expect(res.body.data.status).to.eq(data.status);
                // data.gender = 'female';
                expect(res.body.data).to.deep.include(data);
            });
        });
    it('PUT /:id', () =>{
        const data = {
            'status':'active',
            'name':`Luffy - ${Math.floor(Math.random()*9999)}`
        }
        return request
            .put(`v1/users/47?access-token=${TOKEN}`)
            .send(data)
            .then((res) =>{
                console.log(res.body);
                expect(res.body.data).to.deep.include(data);
            });
    });

    it('DELETE /:id', () => {
        return request
            .delete(`v1/users/31?access-token=${TOKEN}`)
            .then((res) => {
                expect(res.body.data).to.be.undefined;
            });
    });
});
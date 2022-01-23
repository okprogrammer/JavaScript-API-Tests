require('dotenv').config();
import request from "../config/common";
const faker = require('faker');
import { expect } from "chai";
import {
    createRandomUser,
    createRandomUserWithFaker
} from "../helper/user_helper";

const TOKEN = process.env.USER_TOKEN;

describe('User Posts', () => {
    let postId, userId;
    before(async () => {
        userId = await createRandomUserWithFaker();
    });

    it('/posts', async () => {

        const data = {
            user_id: userId,
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
        }

        const postRes = await request
            .post(`v1/posts?access-token=${TOKEN}`)
            .send(data);
        console.log(postRes.body)
        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id;
    });

    it('GET /posts/:id', async () => {
        await request
            .get(`v1/posts/${postId}?access-token=${TOKEN}`)
            .expect(200);

    });

    describe('Negative Tests', () => {
        it('401 Authentication Failed', async () => {
            const data = {
                user_id: userId,
                title: "My title",
                body: "my blog post"
            }

            const postRes = await request
                .post(`v1/posts`)
                .send(data);
            expect(postRes.status).to.eq(401);
            expect(postRes.body.message).to.eq("Authentication failed");
        });

        it('422 Validation Failed', async () => {
            const data = {
                user_id: userId,
                title: "My title"
            }

            const postRes = await request
                .post(`v1/posts?access-token=${TOKEN}`)
                .send(data);
            console.log(postRes.body);
            // console.log(postRes.text.data[0].field);
            // console.log(postRes.text.data[0].message);
            expect(postRes.status).to.eq(422);
            expect(postRes.body.data[0].field).to.eq("body");
            expect(postRes.body.data[0].message).to.eq("can't be blank");
        });
    });
});

import request from 'supertest';
import {app} from '../../bootstrap/server.js';

describe('Authentication Module Tests', () =>
{
    it('should allow a user to sign up', (done) =>
    {
       const response = request(app)
        .post("/api/v1/auth/register")
        .send({
            email: "bensondiaz@gmail.com",
            password: "password",
            username: "bennydiaz"
        });

        //we want to test the response to see if we get a 201
        response.expect(201, done)
        //.catch((err) => done(err));
    });
});
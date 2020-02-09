const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('google play app', () => {
    it('should return an array of apps', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            const app = res.body[0];
            expect(app).to.include.all.keys(
                'App',
                'Category',
                'Rating',
                'Reviews'
            );
        });
    });

    it('should sort by rating', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'rating' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;

            let i = 0;

            while (i < res.body.length - 1) {
                const appAtI = res.body[i];
                const appAtIPlus1 = res.body[i + 1];

                if (appAtIPlus1.rating < appAtI.rating) {
                    sorted = false;
                    break;
                }
                i++;
            }
            expect(sorted).to.be.true;
        });
    });


});

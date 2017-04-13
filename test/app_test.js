const assert = require('assert');
const app = require('../app');
const request = require('supertest');

describe('The Express app', () => {
    it('handles GET request to /api', (done) => {
        request(app)
            .get('/api')
            .end((err, res) => {
                assert(res.body.hi === 'there' && res.status === 200);
                done();
            });
    });
});

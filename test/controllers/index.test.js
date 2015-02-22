var request = require('supertest');
var assert = require('assert');
var app = require('./../../app');

describe('Index Controller', function() {
    it('should return 404 status code when GET /non/existent/uri', function(done) {
        request(app)
            .get('/non/existent/uri')
            .expect('Content-Type', /html/)
            .expect(404, done);
    });

    it('should contain "Hello nobody" text in body content when GET /', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(/Hello nobody/)
            .expect(200, done);
    });

    it('should contain "Hello Chris" text in body content when GET /Chris', function(done) {
        request(app)
            .get('/Chris')
            .expect('Content-Type', /html/)
            .expect(/Hello Chris/)
            .expect(200, done);
    });
});

var request = require("request"),
    assert = require('assert'),
    sut = require("../server/app.js"),
    base_url = "http://localhost:5000/api";

/* End to end tests */

describe("Weather Svc", () => {

    after("close web server", ()=> {
        sut.tearDown();
    });

    describe("GET forecast for london", () => {
        it("returns status code 200",(done) => {
            let url = base_url + "/forecast?name=London&country=GB"
            request.get(url, function(error, response) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    describe("GET forecast for berlin", () => {
        it("returns status code 200",(done) => {
            let url = base_url + "/forecast?name=Berlin&country=DE"
            request.get(url, function(error, response) {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });


    describe("GET forecast for unknown country", () => {
        it("returns status code 404",(done) => {
            let url = base_url + "/forecast?name=XXXX&country=YY"
            request.get(url, function(error, response) {
                assert.equal(404, response.statusCode);
                done();
            });
        });
    });

    describe("GET forecast with missing params", () => {
        it("returns status code 400",(done) => {
            let url = base_url + "/forecast"
            request.get(url, function(error, response) {
                assert.equal(400, response.statusCode);
                done();
            });
        });
    });
});
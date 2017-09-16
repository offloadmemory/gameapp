var controllers = require("../../app/controllers");
var sinon = require("sinon");
var should = require("should");
var arithmeticController = controllers.arithmeticController;

describe("Test Arithmetic Controller", function () {
    var mockReq, mockRes;

    beforeEach(function () {
        mockReq = {
            body: {
                operand1: 11,
                operand2: 11,
                operation: 'add',
                answer: 23
            }
        };
    });

    it("add operation returning false", function (done) {
        mockRes = {
            send: function (response) {
                should.equal(response, false);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("add operation returning true", function (done) {
        mockReq.body.answer = 22;
        mockRes = {
            send: function (response) {
                should.equal(response, true);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("subtraction operation returning true", function (done) {
        mockReq.body.operation = 'sub';
        mockReq.body.answer = 0;
        mockRes = {
            send: function (response) {
                should.equal(response, true);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("subtraction operation returning false", function (done) {
        mockReq.body.operation = 'sub';
        mockReq.body.answer = 1;
        mockRes = {
            send: function (response) {
                should.equal(response, false);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("multiplication operation returning true", function (done) {
        mockReq.body.operation = 'mul';
        mockReq.body.answer = 121
        mockRes = {
            send: function (response) {
                should.equal(response, true);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("multiplication operation returning false", function (done) {
        mockReq.body.operation = 'mul';
        mockReq.body.answer = 111
        mockRes = {
            send: function (response) {
                should.equal(response, false);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });

    it("division operation returnong true", function (done) {
        mockReq.body.operation = 'div';
        mockReq.body.answer = 1
        mockRes = {
            send: function (response) {
                should.equal(response, true);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });
    it("division operation returning false", function (done) {
        mockReq.body.operation = 'div';
        mockReq.body.answer = 2
        mockRes = {
            send: function (response) {
                should.equal(response, false);
                done();
            }
        };
        arithmeticController(mockReq, mockRes);
    });
});
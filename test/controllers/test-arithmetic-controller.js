var controllers = require("../../app/controllers");
var sinon    = require("sinon");
var should   = require("should");
var arithmeticController = controllers.arithmeticController;

describe("Test Arithmetic Controller", function(){
    var mockReq, mockRes;

    beforeEach(function(){
        mockReq = {
            body : {
                operand1  : 11,
                operand2  : 11,
                operation : 'add',
                answer    : 23
            }
        };
    });

    it.only("add operation returning false", function(done){
        mockRes = {
            send : function(response){
                should.equal(response, false);
                done();
            }
        };        
        arithmeticController(mockReq, mockRes);
    });

    it.only("add operation returning true", function(done){
        mockReq.body.answer = 22;
        mockRes = {
            send : function(response){
                should.equal(response, true);
                done();
            }
        };        
        arithmeticController(mockReq, mockRes);
    });    

    it("subtraction operation", function(done){
        done();
    });    

    it("multiplication operation", function(done){
        done();
    });    

    it("division operation", function(done){
        done();
    });        
});
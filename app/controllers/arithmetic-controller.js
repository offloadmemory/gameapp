
function arithmeticController(req, res){
    var operand1 = req.body.operand1;
    var operand2 = req.body.operand2;
    var operation = req.body.operation;
    var answer = req.body.answer;

    if (operation == "add") {
        var result = operand1 + operand2;
    }
    else if (operation == "sub") {
        var result = operand1 - operand2;
    }
    else if (operation == "mul") {
        var result = operand1 * operand2;
    }
    else if (operation == "div") {
        var result = operand1 / operand2;
    }
    if (result == answer) {
        res.send(true);
    }
    else{
        res.send(false);
    }    
}

module.exports = arithmeticController;
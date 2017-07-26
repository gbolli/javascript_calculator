$(document).ready(function(){

    var numbers = [];
    var operators = [];
    var counter = 0;
    var number = "";
    var lastPressedType;
    var display = $("#display");
    display.text("0");
    
    $("#numbers > a").not("#clear,#clearall").click(function(){
        lastPressedType = $(this).closest('div').attr('id');
        number += $(this).text();
        display.text(number);
        testNumLength(number);
    });
    
    $("#operators > a").not("#equals").click(function(){
        if (lastPressedType !== "operators") {
            lastPressedType = $(this).closest('div').attr('id');
            // console.log(lastPressedType);
            numbers[counter] = number;
            // console.log(number + " added to numbers array");
            number = "";
            operators[counter] = $(this).text();
            // console.log(operators[counter] + " added to operators array");
            display.text($(this).text());
            counter++;
            // console.log("counter increased to " + counter);
        } else {
            display.text($(this).text());
            // console.log("operator used multiple times")
            operators[counter - 1] = $(this).text();
        }
    });
    
    $("#clear,#clearall").click(function(){
        number = "";
        display.text("0");
        if ($(this).attr("id") === "clearall") {
          numbers = [];
          operators = [];
          counter = 0;
        }
    });
    
    $("#equals").click(function() {
        numbers[counter] = number;
        // console.log(number + " added to numbers array");
        // console.log(numbers);
        // console.log(operators);
        var answer = parseFloat(numbers[0]);

        for (var i = 0; i < numbers.length - 1; i++) {
            // console.log(answer);
            if (operators[i] === "+") {
                answer += parseFloat(numbers[i+1]);
            } else if (operators[i] === "-") {
                answer -= parseFloat(numbers[i+1]);
            } else if (operators[i] === "/") {
                answer /= parseFloat(numbers[i+1]);
            } else {
                answer *= parseFloat(numbers[i+1]);
            }
        }
        answer = answer.toString().length >= 10 ? answer.toFixed(7).toString() : answer.toString();
        display.text(answer);
        testNumLength(answer);
        numbers = [];
        operators = [];
        counter = 0;
        number = answer;
    })

    var testNumLength = function(number) {
        if (number.length > 9) {
            display.text(number.substr(number.length-9,9));
            if (number.length > 9) {
                number = "";
                display.text("Err");
            }
        } 
    };
});
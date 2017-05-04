/**
 * Created by Carlos on 5/4/17.
 */
(function () {
    "use strict";

    //Allow user to start the game by clicking on the start button

    $('#start-btn').click(function () {
        $('.start-container').addClass('hidden');
        $('.round-label').addClass('active');
        generatePattern();


    });

    //Once start is clicked, Simon will generate and display a step for user to follow/repeat.
    var sequence = [];
    var userInput = [];
    var i = 0;
    var roundCounter = 1;
    var topScore = 0;

    //generate a random number
    function random() {
        return Math.floor((Math.random() * 4) + 1);
    }

    //generate a color to add to the sequence and display it
    function generatePattern() {
        sequence.push(random());
        setTimeout(function () {
            displayPattern();
        }, 1500);
    }


    //lights up boxes for game sequence and user inputs
    function lightUp(box, color) {
        $(box).addClass('light-up-' + color);
        setTimeout(function () {
            $(box).removeClass('light-up-' + color);
        }, 400);
    }

    //lights up border if sequence is correct/incorrect
    function borderLight(result) {
        $('.container').addClass('border-' + result);
        setTimeout(function() {
            $('.container').removeClass('border-' + result);
        }, 2000);
    }

    //animates the round number
    function roundNumber() {
        $('#round').removeClass('round-animate');
        setTimeout(function() {
            $('#round').addClass('round-animate');
        },1);
    }

    //update score
    function updateScore(newScore) {
        var currentScore = $('#score').html();
        var newScore = newScore - 1;
        if (newScore > currentScore) {
            topScore++;
            $('#score').html(topScore);
        }
    }

    //Fail box animation
    function fadeRestart() {
        $('.red').removeClass('red-intro');
        setTimeout(function() {
            $('.red').addClass('red-intro');
        }, 1);
        $('.green').removeClass('green-intro');
        setTimeout(function() {
            $('.green').addClass('green-intro');
        }, 1);
        $('.blue').removeClass('blue-intro');
        setTimeout(function() {
            $('.blue').addClass('blue-intro');
        }, 1);
        $('.yellow').removeClass('yellow-intro');
        setTimeout(function() {
            $('.yellow').addClass('yellow-intro');
        }, 1);
    }

    //display Pattern
    function displayPattern() {
        var i = 0;
        var intervalId = setInterval(function () {


            switch (sequence[i]) {
                case 1:
                    lightUp('.red', 'red');
                    break;
                case 2:
                    lightUp('.green', 'green');
                    break;
                case 3:
                    lightUp('.blue', 'blue');
                    break;
                case 4:
                    lightUp('.yellow', 'yellow');
                    break;
            }

            if (i == sequence.length - 1) {
                clearInterval(intervalId);
            } else {
                i++;
            }
        }, 500);
    }


    //Allow user to repeat pattern that was shown

    //Make buttons light up on click
    $('.red').click(function () {
        lightUp(this, 'red');
    });

    $('.green').click(function () {
        lightUp(this, 'green');
    });

    $('.blue').click(function () {
        lightUp(this, 'blue');
    });

    $('.yellow').click(function () {
        lightUp(this, 'yellow');
    });


    //Click features
    $('.box').click(function () {
        var boxValue = parseFloat($(this).attr('data-value'));
        userInput.push(boxValue);

        if(boxValue === sequence[i]) {
            i++;

            //If user is correct in pattern given, update the round that the user in
            // allow Simon to generate an additional step to add on the existing pattern
            if(userInput.length === sequence.length) {
                generatePattern();
                i = 0;
                userInput = [];
                roundCounter++;
                $('#round').html(roundCounter);
                updateScore(roundCounter);
                roundNumber();
                borderLight('correct')
            }

        //If user fail, Simon pattern will be reset until user starts new game.
        } else {
            i = 0;
            sequence = [];
            userInput = [];
            $('.start-container').removeClass('hidden');
            $('.round-label').removeClass('active');
            roundCounter = 1;
            $('#round').html(1);
            borderLight('wrong');
            fadeRestart();
            $('.score-tracker').removeClass('transparent');
        }



//
//            console.log('var i = '+i);
//            console.log('sequence.lenght =' +sequence.length);
//            console.log('boxValue = ' +boxValue);
//            console.log('value at seqyence index i index = ' +sequence[i]);
//            console.log('clicks =' + clicks);
//            console.log('--------------------------------');
//
//
//            if (boxValue === sequence[i]) {
////                console.log(boxValue);
//                i++;
//                clicks++;
//
//                if (clicks >= sequence.length) {
//
//                    generatePattern();
//                    console.log(sequence);
//
//                }
//            } else {
//                i = 0;
//            }
    });


})();
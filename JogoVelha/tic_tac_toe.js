var player,winner = null;
var selectedPlayer = document.getElementById('selected_player');
var selectedWinner = document.getElementById('selected_winner');

changePlayer('X');


function chooseSquare(id){
    if(winner !== null){
        return;
    }
    
    var square = document.getElementById(id);
    if(square.innerHTML !== '-'){
        return;
    }

    square.innerHTML = player;
    square.style.color = '#000';

    if(player === 'X'){
        player = 'O';
    } else {
        player = 'X'
    }

    changePlayer(player);
    checkWinner();
}

function changePlayer(value){
    player = value;
    selectedPlayer.innerHTML = player;
}

function checkWinner() {
    var square1 = document.getElementById(1);
    var square2 = document.getElementById(2);
    var square3 = document.getElementById(3);
    var square4 = document.getElementById(4);
    var square5 = document.getElementById(5);
    var square6 = document.getElementById(6);
    var square7 = document.getElementById(7);
    var square8 = document.getElementById(8);
    var square9 = document.getElementById(9);

    if(checkSequence(square1, square2, square3)){
        changeSquareColor(square1, square2, square3);
        changeWinner(square1);
    }
    if(checkSequence(square4, square5, square6)){
        changeSquareColor(square4, square5, square6);
        changeWinner(square4);
    }
    if(checkSequence(square7, square8, square9)){
        changeSquareColor(square7, square8, square9);
        changeWinner(square7);
    }
    if(checkSequence(square1, square4, square7)){
        changeSquareColor(square1, square4, square7);
        changeWinner(square1);
    }
    if(checkSequence(square2, square5, square8)){
        changeSquareColor(square2, square5, square8);
        changeWinner(square2);
    }
    if(checkSequence(square3, square6, square9)){
        changeSquareColor(square3, square6, square9);
        changeWinner(square3);
    }
    if(checkSequence(square1, square5, square9)){
        changeSquareColor(square1, square5, square9);
        changeWinner(square1);
    }
    if(checkSequence(square3, square5, square7)){
        changeSquareColor(square3, square5, square7);
        changeWinner(square3);
    }
}

function changeWinner(square){
    winner = square.innerHTML;
    selectedWinner.innerHTML = winner;
}

function changeSquareColor(value1, value2, value3){
    value1.style.background = '#0f0';
    value2.style.background = '#0f0';
    value3.style.background = '#0f0';
}

function checkSequence(value1, value2, value3){
    var isEqual = false;

    if(value1.innerHTML !== '-' && value1.innerHTML === value2.innerHTML && value2.innerHTML === value3.innerHTML){
        isEqual = true;
    }

    return isEqual;
}

function reboot(){
    winner = null;
    selectedWinner.innerHTML = ' ';

    for(var i = 1; i <= 9; i++){
        var square = document.getElementById(i);
        square.style.background = '#eee';
        square.style.color = '#eee';
        square.innerHTML = '-';
    }

    changePlayer('X');
}
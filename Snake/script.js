var canvas = document.getElementById('snake');
var ctx = canvas.getContext('2d');
var btpausa = document.getElementById('btpausar');
let box = 32;
let snake = [];
snake[0] = { 
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
var rodando = false;
let jogo;
var intervalo;
let direction = "right";
var score;
var gameover = new Image();
gameover.src = 'game_Over.png';

novoJogo();

function desenharTela(){
    //Tabuleiro
    ctx.fillStyle = 'YellowGreen';
    ctx.fillRect(0, 0, 16 * box, 16 * box);

    //Snake
    for(i=0; i < snake.length; i++){
        ctx.fillStyle = (i== 0)?'DarkOliveGreen':'Olive';
        ctx.fillRect(snake[i].x, snake[i].y, box , box );
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'black';
        ctx.strokeRect(snake[i].x, snake[i].y, box , box );  
    }
    //Fruta
    ctx.fillStyle = 'Maroon';
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function principal(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    let snakex = snake[0].x;
    let snakey = snake[0].y; 

    if(direction == "right") snakex += box;
    if(direction == "left") snakex -= box;
    if(direction == "up") snakey -= box;
    if(direction == "down") snakey += box;

    if(snakex != food.x || snakey != food.y){
        snake.pop();
    }else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score += 50;
        document.getElementById("score").innerHTML = score; 
    }

    let newhead = {
        x: snakex,
        y: snakey
    }
    snake.unshift(newhead);

    desenharTela();
    gameOver();
}

function novoJogo(){
    if(rodando)
        pausa();
    intervalo = 200;
    snake.length = 1;
    score = 0;
    document.getElementById("score").innerHTML = score;         
    btpausa.innerHTML = "Iniciar";
    btpausa.disabled = false;
    desenharTela(); 
}

function pausa(){
    rodando = !rodando;
    if(rodando){
        btpausa.innerHTML = "pausar";
        jogo = setInterval("principal()", intervalo);
    }
    else{
        clearInterval(jogo);
        btpausa.innerHTML = "Continuar";
    }
}

function gameOver(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
           btpausa.disabled = true;
           if(rodando)
            pausa();
            ctx.drawImage(gameover,0,0);   
        }
    }
}
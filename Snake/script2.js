const cnv = document.getElementById('snake');
const ctx = cnv.getContext('2d');
let scale = 32;
const rows = cnv.height / scale;
const columns = cnv.width / scale;
snake = new Snake();
var foodImg = new Image();
foodImg.src = "imagens/food.png";
food = new Food();
food.position();
var gameover = new Image();
gameover.src = 'imagens/gameOver.png';
let score = 0;
let game;
let direction;
var estados = {
    jogar:0,
    jogando:1,
    perdeu:2
};
let messages = [];
var snakemessage = new ObjectMessage(cnv.height/3,"SNAKE GAME","bold 50px Potta one","#808000");
messages.push(snakemessage);
var startmessage = new ObjectMessage(cnv.height/2,"START","bold 30px Potta one","#556B2F");
messages.push(startmessage);
var endmessage = new ObjectMessage(cnv.height/3,"GAME OVER","bold 50px Potta one","#FF0000");
messages.push(endmessage);
var restartmessage = new ObjectMessage(cnv.height/2,"RESTART","bold 30px Potta one","#556B2F");
messages.push(restartmessage);
pontosfase = [100,200];
fase = 0;
window.onload = ()=>{
    estado = estados.jogar;
    function draw(){
        ctx.clearRect(0,0,cnv.width,cnv.height);
        //Tabuleiro
        ctx.fillStyle = 'YellowGreen';
        ctx.fillRect(0, 0, columns * scale, rows * scale);

        if (estado == estados.jogando){
            //food
            food.draw(ctx);
            //snake
            snake.draw(ctx); 
        }if (estado == estados.jogar){
            snakemessage.visible = true;
            startmessage.visible = true;
            endmessage.visible = false;
            restartmessage.visible = false;
            snake.draw();
        }
        if (estado == estados.perdeu){
            endmessage.visible = true;
            restartmessage.visible = true;   
        }
        
        if(messages.length !== 0){
            for(var i in messages){
                var message = messages[i];
                if(message.visible){
                    ctx.font = message.font;
                    ctx.fillStyle = message.color;
                    ctx.textBaseline = message.baseline;
                    message.x = (cnv.width - ctx.measureText(message.text).width)/2;
                    ctx.fillText(message.text, message.x, message.y);
                }
            }
        }
    }

    function update(){
        if (estado == estados.jogando){
            snake.update();

            if(snake.eat(food)){
                food.position();
                score += 50;
                document.getElementById("score").innerHTML = score; 
            }
            if(snake.collide()){
                gameOver();
                estado = estados.perdeu; 
            }
        }   
    }

    function loop(){
        game = setInterval(()=>{
            update();
            draw();
        }, 250);
    }

    document.addEventListener('keydown', handle);
    window.addEventListener('click', function(){ 
        if(estado == estados.jogar){
            estado = estados.jogando;
            snakemessage.visible = false;
            startmessage.visible = false;
            snake.update();
        }else if(estado == estados.perdeu){
            estado = estados.jogar;
            endmessage.visible = false;
            restartmessage.visible = false; 
        }  
    });

    function handle(evt){ 
        if(evt.keyCode == 37 && direction != "right") direction = "left";
        if(evt.keyCode == 38 && direction != "down") direction = "up";
        if(evt.keyCode == 39 && direction != "left") direction = "right";
        if(evt.keyCode == 40 && direction != "up") direction = "down";

        if(direction == "right"){
            snake.xSpeed = scale * 1;
            snake.ySpeed = 0;
        }
        if(direction == "left"){
            snake.xSpeed = -scale * 1;
            snake.ySpeed = 0;
        }
        if(direction == "up"){
            snake.xSpeed = 0;
            snake.ySpeed = -scale * 1;   
        }
        if(direction == "down"){
            snake.xSpeed = 0;
            snake.ySpeed = scale * 1;
        }
        snakemessage.visible = false;
        startmessage.visible = false;
        if (estado == estados.jogar){
            estado = estados.jogando;
            snakemessage.visible = false;
            startmessage.visible = false;
        }
    }
    
    function gameOver(){
        clearInterval(game);
        endmessage.visible = true;
        snake.tail = [];
        score = 0;
    }

    loop();
}

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function(){
        ctx.fillStyle = 'DarkOliveGreen';
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'black';
        for(let i = 0; i < this.tail.length; i++){
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale , scale );
            ctx.strokeRect(this.tail[i].x, this.tail[i].y, scale , scale );   
        }
        ctx.fillRect(this.x, this.y, scale, scale);
        ctx.strokeRect(this.x, this.y, scale, scale); 
    }

    this.update = function(){
        for(let i = 0; i < this.tail.length - 1;i++){
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = { x:this.x, y:this.y};
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x > cnv.width){
            this.x = 0;
        } 
        if(this.y > cnv.height){
            this.y = 0;
        }
        if(this.x < 0){
            this.x = cnv.width;
        } 
        if(this.y < 0){
            this.y = cnv.height;
        }
    }

    this.eat = function(food){
        if(this.x == food.x && this.y == food.y){
            this.total++;
            return true;
        }
        return false;
    }

    this.collide = function(){
        for(let i = 1; i < this.tail.length; i++){
            if(this.x == this.tail[i].x && this.y == this.tail[i].y){
                return true;
            }  
        }
    }
}

function Food(){
    this.x;
    this.y;

    this.position = function(){
        this.x = Math.floor(Math.random() * 15 + 1) * scale;
        this.y = Math.floor(Math.random() * 15 + 1) * scale;
    }

    this.draw = function(){
        ctx.drawImage(foodImg, this.x, this.y);
    }
}

function ObjectMessage(y,text,font,color){
    this.x = 0;
    this.y = y;
    this.text = text;
    this.visible = true;
    this.font = font;
    this.color = color;
    this.baseline = "top";
}

window.onload = ()=>{
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var sceneSheet = new Image();
    sceneSheet.src = "imagens/background.png";
    var scene = new Scene(sceneSheet);
    var dinoSheet = new Image();
    dinoSheet.src = "imagens/dino.png";
    var dino = new Dino(dinoSheet);
    var obsSheet = new Image();
    obsSheet.src = "imagens/monster.png";
    let obstaculos = [];
    var insereobs = 0;
    var estados = {
        jogar:0,
        jogando:1,
        perdeu:2
    };
    let messages = [];
    var dinomessage = new ObjectMessage(cnv.height/4,"DINO GAME","bold 50px Bungee Shade","#FF4500");
    messages.push(dinomessage);
    var startmessage = new ObjectMessage(cnv.height/2,"START","bold 30px Bungee Inline","#D2691E");
    messages.push(startmessage);
    var endmessage = new ObjectMessage(cnv.height/2 - 25,"GAME OVER","bold 50px Bungee Shade","#FF0000");
    messages.push(endmessage);
    pontosfase = [100,200];
    fase = 0;
    
    estado = estados.jogar;

    function handle(event){
        if(event.keyCode == 32 || event.touches.length){
            if (estado == estados.jogar){
                estado = estados.jogando;
                dinomessage.visible = false;
                startmessage.visible = false;
            }else if (estado == estados.jogando){
                     dino.jump();
            } else if (estado == estados.perdeu){
                estado = estados.jogar;
                obstaculos = [];
                if(dino.score > record){
                    localStorage.setItem("record",dino.score);
                    record = dino.score;
                }
                dino.score = 0;
                endmessage.visible = false;
                for(let i in obstaculos){
                    var obs = obstaculos[i];
                    obs.speed = 5;}
                faseatual = 0;
            }
        }    
    }
    
    function update(){
        if (estado == estados.jogando){
            scene.atualiza();
            dino.atualiza();
            insere();
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.atualiza();
                if(obs.posX == 0){
                    dino.score += 10;
                    if (fase < pontosfase.length && dino.score == pontosfase[fase]){
                        fase ++;    
                    }
                }
                if (dino.posX  < obs.posX + obs.width - 30 && dino.posX + dino.width - 10 >= obs.posX && dino.posY + dino.height >= obs.posY + 10){
                    estado = estados.perdeu;
                    endmessage.visible = true;
                }
                if(obs.posX <= -obs.width){
                    obstaculos.splice(obs,1);
                }  
            }
        }      
    }

    function insere(){
        if (insereobs == 0){
            obstaculos.push(new Obs(obsSheet));
            if(fase == 0){
                insereobs = 50 + Math.floor(Math.random()*50);
            }else if(fase == 1){
                insereobs = 40 + Math.floor(Math.random()*40);
            }else if(fase == 2){
                insereobs = 30 + Math.floor(Math.random()*40);
            }
        }else { 
            insereobs --;
        }
    }

    function draw(){
        ctx.clearRect(0,0,cnv.width,cnv.height);
        scene.draw(ctx);
        ctx.fillStyle="#FFFAFA";
        ctx.font = "20px Roboto";
        ctx.fillText("Score "+ dino.score,15,15);
        ctx.fillText("Record "+ record,480,15);
        
        if (estado == estados.jogando){
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.draw(ctx);    
            }
            dino.draw(ctx); 
        }if (estado == estados.jogar){
            dinomessage.visible = true;
            startmessage.visible = true;
            endmessage.visible = false;
            dino.posX = 5;
            dino.posY = 240;
            dino.countAnim = 0;
            dino.draw(ctx);
        }if (estado == estados.perdeu){
            dino.countAnim = 0;
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.countAnim = 0;
                obs.draw(ctx);    
            }
            dino.draw(ctx);
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

    function loop(){
        window.requestAnimationFrame(loop,cnv);
        update();
        draw();   
    }
    document.addEventListener('keydown', handle);
    document.addEventListener('touchstart', handle);
    var record = localStorage.getItem("record");
        if(record == null)record = 0; 
    loop();     
}

function Scene(img){
    this.srcX = this.srcY = 0;
    this.width = 1200;
    this.height = 300;
    this.posX = 0;
    this.posY = 0;
    this.img = img;
    
    this.draw = function(ctx){
        ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height);
        ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,(this.posX + this.width),this.posY,this.width,this.height);
    }

    this.atualiza = function(){
        const moveScene = 2;
        const mover = this.posX - moveScene;
        this.posX = mover % this.width;
    }
      
}

function Dino(img){
    this.srcX = this.srcY = 0;
    this.width = 60;
    this.height = 60;
    this.posX = 5;
    this.posY = 240;
    this.img = img;
    this.countAnim = 0;
    this.speed = 0;
    this.gravity = 1;
    this.forçaDoPulo = 16;
    this.score = 0;
    this.draw = function(ctx){
        ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height);
        this.animation();
    }

    this.animation = function(){
        this.countAnim ++;
        if(this.countAnim >= 48){
            this.countAnim = 0;
        }
        this.srcX = Math.floor(this.countAnim / 6) * this.width;
    }

    this.atualiza = () =>{
        this.speed += this.gravity;
        this.posY += this.speed;
        if(this.posY > 300 - this.height){
            this.posY = 300 - this.height;
            isjumping = false;
        }
    }

    this.jump = ()=>{
        if(isjumping == false){
            this.speed = -this.forçaDoPulo;
            isjumping = true;
        }
    }
}

function Obs(img) {
    this.srcX = this.srcY = 0;
    this.width = 60;
    this.height = 60;
    this.posX = 600;
    this.posY = 240;
    this.img = img;
    this.countAnim = 0;
    this.speed = 6;
 
    this.draw = function(ctx){
        ctx.drawImage(this.img,this.srcX,this.srcY,this.width,this.height,this.posX,this.posY,this.width,this.height);
        this.animation();  
    }

    this.atualiza = function (){
        this.posX -= this.speed;
    }

    this.animation = function(){
        this.countAnim ++;
        if(this.countAnim >= 32){
            this.countAnim = 0;
        }
        this.srcX = Math.floor(this.countAnim / 8) * this.width;
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

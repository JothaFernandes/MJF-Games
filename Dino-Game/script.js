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
    var dinomessage = new ObjectMessage(cnv.height/4,"DINO GAME","50px algerian","#006600")
    messages.push(dinomessage);
    var startmessage = new ObjectMessage(cnv.height/2,"PRESS SPACE","30px algerian","#006600")
    messages.push(startmessage);
    var endmessage = new ObjectMessage(cnv.height/2 - 25,"GAME OVER","50px algerian","#e60000")
    messages.push(endmessage);
    
    estadoAtual = estados.jogar;

    function handle(event){
        if(event.keyCode == 32){
            if (estadoAtual == estados.jogar){
                estadoAtual = estados.jogando;
                dinomessage.visible = false;
                startmessage.visible = false;
            }else if (estadoAtual == estados.jogando){
                     dino.jump();
            } else if (estadoAtual == estados.perdeu){
                estadoAtual = estados.jogar;
                obstaculos = [];
                dino.score = 0;
                endmessage.visible = false;
            }
            //else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
            //     estadoAtual = estados.jogar;
            //     obstaculos.limpa();
            //     bloco.reset();
            // }
        }    
    }
    function handlemobile(event){
        
            if (estadoAtual == estados.jogar){
                estadoAtual = estados.jogando;
                dinomessage.visible = false;
                startmessage.visible = false;
            }else if (estadoAtual == estados.jogando){
                     dino.jump();
            } else if (estadoAtual == estados.perdeu){
                estadoAtual = estados.jogar;
                obstaculos = [];
                dino.score = 0;
                endmessage.visible = false;
            }
            //else if (estadoAtual == estados.perdeu && bloco.y >= 2 * ALTURA) {
            //     estadoAtual = estados.jogar;
            //     obstaculos.limpa();
            //     bloco.reset();
            // }
           
    }

    function update(){
        if (estadoAtual == estados.jogando){
            scene.atualiza();
            dino.atualiza();
            if (insereobs == 0) {
                obstaculos.push(new Obs(obsSheet));
                insereobs = 40 + Math.floor(Math.random()*100);
            }else { 
                insereobs --;
            }
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.atualiza();
                if(obs.posX == 0){
                    dino.score++;
                }
                if (dino.posX  < obs.posX + obs.width - 30 && dino.posX + dino.width - 10 >= obs.posX && dino.posY + dino.height >= obs.posY + 10){
                    estadoAtual = estados.perdeu;
                    endmessage.visible = true;
                }
                if(obs.posX <= -obs.width){
                    obstaculos.splice(obs,1);
                }  
            }
        }   
    }

    function draw(){
        ctx.clearRect(0,0,cnv.width,cnv.height);
        scene.draw(ctx);
        ctx.fillStyle="#fff";
        ctx.font = "20px Roboto";
        ctx.fillText("Score "+ dino.score,15,15);
        if (estadoAtual == estados.jogando){
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.draw(ctx);    
            }
            dino.draw(ctx); 
        }if (estadoAtual == estados.jogar){
            dinomessage.visible = true;
            startmessage.visible = true;
            endmessage.visible = false;
            dino.posX = 5;
            dino.posY = 240;
            dino.countAnim = 0;
            dino.draw(ctx);
        }if (estadoAtual == estados.perdeu){
            dino.countAnim = 0;
            for(let i in obstaculos){
                var obs = obstaculos[i];
                obs.countAnim = 0;
                obs.draw(ctx);    
            }
            dino.draw(ctx);
        }
        
        if(messages.length !==0){
            for(var i in messages){
                var message = messages[i]
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
    document.addEventListener('touchstart', handlemobile); 
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
        const movimentoDoChao = 2;
        const repeteEm = this.width;
        const movimentacao = this.posX - movimentoDoChao;
        this.posX = movimentacao % repeteEm;
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
    this.speed = 5;
       
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
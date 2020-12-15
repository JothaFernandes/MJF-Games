const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var gameOver = document.getElementsByClassName('game-over');
let isjumping = false;
let position = 0;
let score = 10;
var end = false;
let cactusinit = screen.width;
var orienta = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
console.log(orienta);
if (screen.width > 576 ){
    cacpos = 60;
    dinopos = 60;
} else if (screen.width < 576 ){
    cacpos = 40;
    dinopos = 40;
}else if (orienta === "landscape-primary"){
    cacpos = 40;
    dinopos = 40;
}

function handle(event){
    if(event.KeyCode = 32){
        if(!isjumping){
        jump();
        }  
    }
}
function jump(){
    isjumping = true;
    
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isjumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            position += 20;
            dino.style.bottom = position +'px';
        }
    }, 10);
}

function createcactus(){
    const cactus = document.createElement('div');
    let cactusposition = cactusinit;
    let randomTime =1000 + Math.floor(Math.random() * 3000);
    let rando = Math.floor(Math.random()*2);
    if(rando == 0){
        cactus.classList.add('cactus');
    } else {
        cactus.classList.add('cactus1');
    }
    cactus.style.left = cactusinit + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (end != true){
            if(cactusposition < 0){
                clearInterval(leftInterval);
                background.removeChild(cactus);
                document.getElementById('score').innerHTML = score;
                score += 10;
            }else if(cactusposition > 0 && cactusposition < cacpos && position < dinopos){
                clearTimeout(jogo);
                end = true;
            } else {
                cactusposition -= 10;
                cactus.style.left = cactusposition + 'px';
            }
        } else {
            background.style.animation = "none";
            cactus.style.left = cactusposition + 'px';
            isjumping = true;
            gameOver[0].innerHTML = '<h1 class="over">Game Over</h1> <button class="btn btnNovo" onclick="novojogo()">Novo Jogo</button>';
        }
    }, 25); 

    jogo = setTimeout(createcactus,randomTime);
}
createcactus();

function novojogo(){
    window.location.reload();
}

document.addEventListener('keydown', handle);
document.addEventListener('keyup', handle);
background.addEventListener('touchstart',()=>{
    if(!isjumping){
        jump();
        } 
},{ passive: true});


const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var gameOver = document.getElementsByClassName('game-over');
let isjumping = false;
let position = 0;
let score = 10;
var over = false;
let timeMobile = 800;
let cactusinit = 1150;

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
    }, 20);
}

function createcactus(){
    const cactus = document.createElement('div');
    let cactusposition = cactusinit;
    let randomTime = timeMobile + Math.floor(Math.random() * 3000);

    cactus.classList.add('cactus');
    cactus.style.left = cactusinit + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (over != true){
            if(cactusposition < 0){
                clearInterval(leftInterval);
                background.removeChild(cactus);
                document.getElementById('score').innerHTML = score;
                score += 10;
            }else if(cactusposition > 0 && cactusposition < 60 && position < 60){
                clearTimeout(jogo);
                over = true;
            } else {
                cactusposition -= 10;
                cactus.style.left = cactusposition + 'px';
            }
        } else {
            background.style.animation = "none";
            cactus.style.left = cactusposition + 'px';
            isjumping = true;
            gameOver[0].innerHTML = '<button class="btnNovo" onclick="novojogo()">Novo Jogo</button> <h1 class="over">Game Over</h1>';
        }
    }, 20);

    jogo = setTimeout(createcactus,randomTime);
}
createcactus();

function novojogo(){
    window.location.reload();
}

document.addEventListener('keydown', handle);
document.addEventListener('keyup', handle);
background.addEventListener('touchstart', handle);
/*window.addEventListener('resize',function(){
    timeMobile = 200;
    cactusinit = 400;
    dinodead = 40;   
});

function sizeOfThings(){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    var screenWidth = screen.width;
    var screenHeight = screen.height;}*/



const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
var gameOver = document.getElementsByClassName('container');
let isjumping = false;
let position = 0;
let score = 10;
let cactusinit = 1200;
let cp = 60;
let dp = 60;


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
    }, 30);
}

function createcactus(){
    const cactus = document.createElement('div');
    let cactusposition = cactusinit;
    let randomTime = 900 + Math.floor(Math.random() * 3000);

    cactus.classList.add('cactus');
    cactus.style.left = cactusinit; + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusposition <  0){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            document.getElementById('score').innerHTML = score;
            score += 10;
        }else if(cactusposition > 0 && cactusposition < cp && position < dp){
            clearInterval(leftInterval);
            gameOver[0].innerHTML = '<div class="game-over"></div>';
        }
        else {
        cactusposition -= 10;
        cactus.style.left = cactusposition + 'px';
        
        }
    }, 30);

    setTimeout(createcactus,randomTime);
}
createcactus();

let resizegame = function(){
    cactusinit = 800;
    dp = 20;
    cp = 20;
}

document.addEventListener('keydown', handle);
document.addEventListener('keyup', handle);
document.addEventListener('click', handle);
window.addEventListener('resize',function(){
    resizegame();
})
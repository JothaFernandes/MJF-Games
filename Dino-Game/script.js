const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isjumping = false;
let position = 0;
let score = 0;

function handleKeyup(event){
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
    let cactusposition = 1300;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1300 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusposition < - 60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusposition > 0 && cactusposition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }
        else {
        cactusposition -= 10;
        cactus.style.left = cactusposition + 'px';
        }
    }, 20);

    setTimeout(createcactus,randomTime);
}
createcactus();
document.addEventListener('keyup', handleKeyup);
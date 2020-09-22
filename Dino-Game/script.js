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
    }, 30);
}

function createcactus(){
    const cactus = document.createElement('div');
    let cactusposition = 840;
    let randomTime = 800 + Math.floor(Math.random() * 3000);

    cactus.classList.add('cactus');
    cactus.style.left = 840 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusposition <  0){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusposition > 0 && cactusposition < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over"></h1>';
        }
        else {
        cactusposition -= 10;
        cactus.style.left = cactusposition + 'px';
        score += 1;
        document.getElementById('score').innerHTML = score;
        }
    }, 30);

    setTimeout(createcactus,randomTime);
}
createcactus();
document.addEventListener('keyup', handleKeyup);
//menu
let menuItem = document.querySelectorAll('.menu-item');
const body = document.querySelector('body');
/*const btnMenu = document.getElementById('btnMenu');
btnMenu.addEventListener('click',function(){
    body.classList.toggle('_move');
})*/

menuItem.forEach(function(menuativo){
    menuativo.addEventListener('click', function(){
        for (var i = 0; i < menuItem.length; i++){
            menuItem[i].classList.remove("ativo")
        }
        menuativo.classList.add("ativo");
        body.classList.toggle('_move');
        menuBtn.classList.remove('open');
        menuOpen = false;
    });
 });

 const menuBtn = document.querySelector('.btnMenu')
 let menuOpen = false;
 menuBtn.addEventListener('click', function(){
     if(!menuOpen){
         menuBtn.classList.add('open');
         menuOpen = true;
         body.classList.toggle('_move');
     }else{
        menuBtn.classList.remove('open');
        menuOpen = false;
        body.classList.toggle('_move');
     }
 })

/*function controleMenu(){
    const menu = document.getElementById('menu');
    if(menu.style.display == "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }
}*/



//slideshow
var numSlide = 1;
const auto = true;
const intervalTime = 5000;
let slideinterval;
mostrarSlide(numSlide);

function mudarSlide(ns){
    mostrarSlide(numSlide += ns);
}
function slideAtual(ns){
    mostrarSlide(numSlide = ns);
}
function mostrarSlide(ns){
    var slides = document.getElementsByClassName('slidebox');
    var indicadores = document.getElementsByClassName('indicador');
    if(ns > slides.length){
        numSlide = 1;
    }
    if(ns < 1){
        numSlide = slides.length;
    }
    for (var i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for (var i = 0; i < indicadores.length; i++){
        indicadores[i].className = indicadores[i].className.replace("ativo","");
    }
    slides[numSlide - 1].style.display = "flex";
    indicadores[numSlide - 1].className += " ativo";
}

function autoplay(){
    mostrarSlide(numSlide);
    numSlide ++;
}

if(auto){
    slideinterval = setInterval(autoplay, intervalTime);
}
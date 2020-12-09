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
   var slides = document.getElementsByClassName('carousel-item');
    var indicadores = document.getElementsByClassName('indicator');
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

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

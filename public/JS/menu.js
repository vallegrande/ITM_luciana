let menu = document.getElementById("navbar-right")
let buttonMenu  = document.getElementById("menu-navbar")

buttonMenu.addEventListener("click", ()=>{
    menuNavbar();
})

function menuNavbar (){
    menu.classList.toggle('show');
    console.log("HEllo");
}
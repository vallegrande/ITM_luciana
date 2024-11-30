window.addEventListener("DOMContentLoaded", () =>{
    onLoader();
})
window.addEventListener("load", () =>{
    setTimeout(()=>{
        hideLoader();
    }, 1000)
})

const loader = document.getElementById("loader-box");

const onLoader = ()=>{
    loader.style.display = "flex";
}
const hideLoader = ()=>{
    
    loader.style.display = "none";
}
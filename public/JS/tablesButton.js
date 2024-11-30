let button1 = document.getElementById("table1");
let button2 = document.getElementById("table2");
let button3 = document.getElementById("table3");

let table1 = document.getElementById("table-container1");
let table2 = document.getElementById("table-container2");
let table3 = document.getElementById("table-container3");

button1.addEventListener("mousedown", ()=>{
    table1.style.display = "block";
    table2.style.display = "none";
    table3.style.display = "none";

    button1.className = "active";
    button2.className = "";
    button3.className = "";
})

button2.addEventListener("mousedown", ()=>{
    table1.style.display = "none";
    table2.style.display = "block";
    table3.style.display = "none";

    button1.className = "";
    button2.className = "active";
    button3.className = "";
})

button3.addEventListener("mousedown", ()=>{
    table1.style.display = "none";
    table2.style.display = "none";
    table3.style.display = "block";

    button1.className = "";
    button2.className = "";
    button3.className = "active";
})
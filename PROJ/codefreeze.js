/*
Web-based diary - js
EECS1012 - PROJECT
Authors: CodeFreeze(Erfan, Idil, William and Marwa)
*/


function nameCatcher() {
    let username = sessionStorage.getItem('username');

    if (username === null) {
        username = prompt("To make this diary more personal to YOU, please enter your name");
    }

    if (username != null) {
        document.getElementById("name").innerHTML = "Welcome " + username;
        sessionStorage.setItem('username', username);
    } else {
        document.getElementById("noUser").innerHTML = "Welcome, Stranger!";
    }
}


//onmouseover functions
function on1(){
    let button = document.getElementById("save");
    button.style.backgroundColor = "blue";
    button.style.color = "white";
    
}
function on2(){
    let button = document.getElementById("lock");
    button.style.backgroundColor = "blue";
    button.style.color = "white";
}
function on3(){
    let button = document.getElementById("img");
    button.style.backgroundColor = "blue";
    button.style.color = "white";
}
function on4(){
    let button = document.getElementById("NightMode");
    button.style.backgroundColor = "blue";
    button.style.color = "white";
}
function on5(){
    let button = document.getElementById("add");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
}
//onmouseout functions
function out1(){
    let button = document.getElementById("save");
    button.style.backgroundColor = "pink";
    button.style.color = "black";
}
function out2(){
    let button = document.getElementById("lock");
    button.style.backgroundColor = "pink";
    button.style.color = "black";
}
function out3(){
    let button = document.getElementById("img");
    button.style.backgroundColor = "pink";
    button.style.color = "black";
}
function out4(){
    let button = document.getElementById("NightMode");
    button.style.backgroundColor = "pink";
    button.style.color = "black";
}
function out5(){
    let button = document.getElementById("add");
    button.style.backgroundColor = "aliceblue";
    button.style.color = "black";
}

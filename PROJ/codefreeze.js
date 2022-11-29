/*
Web-based diary - js
EECS1012 - PROJECT
Authors: CodeFreeze(Erfan, Idil, William and Marwa)
*/

var clicked=1;
var password;
var pass;
let prm = false;
var i = 0;



//onmouseover functions
function on1(){
    let button = document.getElementById("save");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
    
}
function on2(){
    let button = document.getElementById("lock");

    if(clicked==0){
        button.style.backgroundColor = "red";
        button.style.color = "white";
    }
    if(clicked==1){
        button.style.backgroundColor = "lightgreen";
        button.style.color = "white";
    }
 
}
function on3(){
    let button = document.getElementById("img");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
}
function on4(){
    let button = document.getElementById("NightMode");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
}
function on5(){
    let button = document.getElementById("add");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
}
function on6(){
    let button = document.getElementById("LightMode");
    button.style.backgroundColor = "lightgreen";
    button.style.color = "white";
}
//onmouseout functions
function out1(){
    let button = document.getElementById("save");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function out2(){
    let button = document.getElementById("lock");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function out3(){
    let button = document.getElementById("img");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function out4(){
    let button = document.getElementById("NightMode");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function out5(){
    let button = document.getElementById("add");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function out6(){
    let button = document.getElementById("LightMode");
    button.style.backgroundColor = "white";
    button.style.color = "black";
}
function starter() {
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
function lock(){
    window.location="codefreeze.html";
}
function darkMode() {
    var element = document.getElementById("main");
    element.style.backgroundColor = "black";

    var head = document.getElementById("header");
    head.style.backgroundColor = "black"
    head.style.borderColor = "white";

    var name = document.getElementById("name")
    name.style.color = "white"

    var date = document.getElementById("date")
    date.style.color = "white"

    var butt = document.getElementById("buttons")
    butt.style.backgroundColor = "black";
    butt.style.borderColor = "white"; 
}
function lightMode() {
    var element = document.getElementById("main");
    element.style.backgroundColor = "#beefc4";

    var head = document.getElementById("header");
    head.style.backgroundColor = "lightblue"
    head.style.borderColor = "black";

    var name = document.getElementById("name")
    name.style.color = "black"

    var date = document.getElementById("date")
    date.style.color = "black"

    var butt = document.getElementById("buttons")
    butt.style.backgroundColor = "rgb(240, 202, 209)";
    butt.style.borderColor = "black";
}
function add(){
    var newP = document.createElement("textarea")
    i = i+1;
    $(newP).attr("id","passage"+i);
    $(newP).attr("name","form"+i);
    $(newP).attr("rows","4");
    $(newP).attr("cols","50");

    $(newP).css({'backgroundColor':'lightyellow'})
    $(newP).css({'font-family':'Schoolbell','arial':'serif'});
    $(newP).css({'font-size':'25px'});
    $(newP).css({'padding':'10px'});
    $(newP).css({'text-align':'left'});
    $(newP).css({'border':'3px'});
    $(newP).css({'borderColor':'black'});
    $(newP).css({'border':'solid'});
    $(newP).css({'width': '100%'});
    $(newP).css({'box-sizing': 'border-box'});

    $(document.getElementsByClassName("passage")).append(newP);
}


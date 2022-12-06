/*
Web-based diary - js
EECS1012 - PROJECT
Authors: CodeFreeze(Erfan, Idil, William and Marwa)
*/

var clicked=1;
var pass;
var user;

var userDataSheet;
var username;
var password;

let prm = false;
var i = 0;

var url = "http://localhost:3000/post";


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
/*
function starter() {
    let username = sessionStorage.getItem('username');

    if (username === null) {
        username = prompt("To make this diary more personal to YOU, please enter your name");
    }

    if (username != null) {
        document.getElementById("username").innerHTML = "Welcome " + username;
        sessionStorage.setItem('username', username);
    } else {
        document.getElementById("noUser").innerHTML = "Welcome, Stranger!";
    }
}
*/


function starter() {
    username = sessionStorage.getItem('username');
    password = sessionStorage.getItem('password');
    userDataSheetRequest();
    
    var n =  new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y + " Hello, " + username;

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

    var username = document.getElementById("username")
    username.style.color = "white"

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

    var username = document.getElementById("username")
    username.style.color = "black"

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
    $(newP).attr("username","form"+i);
    $(newP).attr("rows","4");
    $(newP).attr("cols","50");
    $(newP).attr("innerHTML", "passage#"+i);

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

    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    newP.innerHTML = m + "/" + d + "/" + y

    $(document.getElementsByClassName("passage")).append(newP);
}

function save(){
    var tempEntryList = [];
    var tempID;
    var tempPassage;

    for(var i = 0; i<$(document.getElementsByClassName("passage")).length; i++){
        tempID =  $(document.getElementsByClassName("passage"))[i].id;
        tempPassage = $(document.getElementsByClassName("passage"))[i].innerHTML;
        tempEntryList.append({tempID:tempPassage});
    }
    userDataSheet['diaryEntryList'] = tempEntryList;
    userDataSheetUpdate();

}

function del(){
    alert("which passage do you want to delete? You have "+i+" passage so far")
    var res = prompt("Write the passage number you'd like to delete:")
    
    if(res>i || res<1){
        alert("This passage doesn't exist!")
    }else{
        document.getElementById("passage"+res).style.display = "none";
        alert("passage"+res+" has been deleted!");
    }
    
}

//pass is hashed, in the form of an int
//content should be string
function encrypt(content, password){
    var charArray = Array.from(content)
    for(var i = 0; i < charArray.length; i++){
        charArray[i]=password+charArray[i].charCodeAt(0);
    }
    return charArray;
}

//pass is hashed, in the form of an int
function decrypt(content, password){
    for(var i = 0; i < content.length; i++){
        content[i]=String.fromCharCode(content[i]-password);
    }
    return content.join("");
}

//input should be string
function hash(input){
    var output = 0;
    var charArray = Array.from(input)
    for(var i = 0; i < charArray.length; i++){
        output+=charArray[i].charCodeAt(0);
    }
    return output;
}

function createButton(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    $.post(url+'?data='+JSON.stringify({
        'username':username, 
        'action':'createNewAccount', 
        'password':password}),
        response
    );
}

function loginButton(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    $.post(url+'?data='+JSON.stringify({
        'username':username, 
        'action':'login', 
        'password':password}),
        response
    );
}

function userDataSheetRequest(){
    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;

    $.post(url+'?data='+JSON.stringify({
        'username':username, 
        'action':'userDataSheetRequest', 
        'password':password}),
        response
    );
}

function userDataSheetUpdate(){
    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;

    $.post(url+'?data='+JSON.stringify({
        'username':username, 
        'action':'userDataSheetUpdate',  
        'userDataSheet': userDataSheet,
        'password':password}),
        response
    );
}

function response(data, status){
    var response = JSON.parse(data);
    alert(response["action"]);
    
    if(response["action"]=="loginSuccess"){
        loginSuccess();
    }else if(response["action"]=="loginFailed"){
        loginFailed();
    }else if(response["action"]=="userNotFound"){
        userNotFound();
    }else if(response["action"]=="userDataSheetReturn"){
        setUserDataSheet(response);
    }else if(response["action"]=="userExists"){
        document.getElementById("alertText").innerHTML = "User already exists";
    }else if(response["action"]=="accountCreated"){
        accountCreated();
    }
}


function loginSuccess(){
    document.getElementById("alertText").innerHTML = "Login Success";
    userDataSheetRequest();
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    window.location="main.html";
}

function loginFailed(){
    
    document.getElementById("alertText").innerHTML = "Login Failed";
}

function userNotFound(){
    
    document.getElementById("alertText").innerHTML = "User not found. Create new account?";
}

function setUserDataSheet(response){
    userDataSheet = response["userDataSheet"];
}

function accountCreated(){
    document.getElementById("alertText").innerHTML = "Account Created";
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    window.location="main.html";
}
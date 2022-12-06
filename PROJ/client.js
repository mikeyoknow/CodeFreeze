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
    let button = document.getElementById("delete");
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
    let button = document.getElementById("delete");
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

    setTimeout(loadEntries, 50); //timeout neccessary so that userDataSheet isn't undefined when called
    
}

function loadEntries(){
    userDataSheetRequest();
    userDataSheet['diaryEntryList'].forEach(createPassageElement);
    function createPassageElement(entry) {
        //alert(entry['id']);
        add(entry['id'], entry['content']);
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

function add(entryID, content){

    var newP = document.createElement("textarea");
    var newCheck = document.createElement("input");
    $(newCheck).attr("type","checkbox");
    var newDiv = document.createElement("div");

    i = i+1;
    $(newP).attr("username","form"+i);
    $(newP).attr("rows","4");
    $(newP).attr("cols","50");
    //$(newP).attr("innerHTML", "passage#"+i);

    $(newP).css({'backgroundColor':'lightyellow'})
    $(newP).css({'font-family':'Schoolbell','arial':'serif'});
    $(newP).css({'font-size':'25px'});
    $(newP).css({'padding':'10px'});
    $(newP).css({'text-align':'left'});
    $(newP).css({'border':'3px'});
    $(newP).css({'borderColor':'black'});
    $(newP).css({'border':'solid'});
    $(newP).css({'width': '98%'});
    $(newP).css({'box-sizing': 'border-box'});

    $(newP).attr("class","passage");

    if (entryID == null){
        var newID = String(getMaxID()+1);
        $(newP).attr("id",newID);
        var n =  new Date();
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        var d = n.getDate();
        newP.innerHTML = m + "/" + d + "/" + y;
        userDataSheet['diaryEntryList'].push({'id':newID, 'content':newP.innerHTML})
    }else{
        newP.id = entryID;
        newP.innerHTML = content;
    }

    newCheck.id = "c" + newP.id;
    $(newCheck).attr("class","checkbox");
    newDiv.append(newCheck);
    newDiv.append(newP);
    document.getElementById("passages").append(newDiv);

}

function getMaxID(){
    var max = 0;
    for(var i = 0; i < userDataSheet['diaryEntryList'].length; i++){
        if(parseInt(userDataSheet['diaryEntryList'][i]['id']) > max){
            max = parseInt(userDataSheet['diaryEntryList'][i]['id']);
        }
    }
    return max;
}

function save(){
    var tempEntryList = [];
    var tempID;
    var tempPassage;

    for(var i = 0; i< document.getElementsByClassName("passage").length; i++){
        tempID =  document.getElementsByClassName("passage")[i].id;
        tempPassage = document.getElementsByClassName("passage")[i].value;
        tempEntryList.push({'id':tempID, 'content':tempPassage});
    }
    userDataSheet['diaryEntryList'] = tempEntryList;
    console.log(tempEntryList);
    userDataSheetUpdate();

}

function del(){
    if(confirm("Are you sure?")){
        var checkboxList = document.getElementsByClassName("checkbox");
        for(var i = 0; i < checkboxList.length; i++){
            if(checkboxList[i].checked){
                for(var j = 0; j < userDataSheet['diaryEntryList'].length; j ++){
                    if(String(userDataSheet['diaryEntryList'][j]['id']) === String(checkboxList[i].id.substring(1))){
                        userDataSheet['diaryEntryList'].splice(j, 1);
                        document.getElementById(checkboxList[i].id.substring(1)).remove();
                        checkboxList[i].remove();
                    }
                }
            }
        }

        userDataSheetUpdate();
    }
}


function encryptEntries(entryList, password){
    var hashedPass = hash(password);
    for(var i = 0; i < entryList.length; i++){
        entryList[i]['content'] = encrypt(entryList[i]['content'], hashedPass);
    }
    return entryList;
}

function decryptEntries(entryList, password){
    var hashedPass = hash(password);
    for(var i = 0; i < entryList.length; i++){
        entryList[i]['content'] = decrypt(entryList[i]['content'], hashedPass);
    }
    return entryList;
}

//pass is hashed, in the form of an int
//content should be string
function encrypt(content, password){
    var charArray = Array.from(content);
    var hashedPass = hash(password);
    for(var i = 0; i < charArray.length; i++){
        charArray[i]=hashedPass+charArray[i].charCodeAt(0);
    }
    return charArray;
}

//pass is hashed, in the form of an int
function decrypt(content, password){
    var hashedPass = hash(password);
    var temp = [];
    for(var i = 0; i < content.length; i++){
        temp.push(String.fromCharCode(content[i]-hashedPass));
    }
    return temp.join("");
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
        'username':encrypt(username, password), 
        'action':'createNewAccount', 
        'password':hash(password)}),
        response
    );
}

function loginButton(){
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    $.post(url+'?data='+JSON.stringify({
        'username':encrypt(username, password), 
        'action':'login', 
        'password':hash(password)}),
        response
    );
}

function userDataSheetRequest(){
    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;

    $.post(url+'?data='+JSON.stringify({
        'username':encrypt(username, password), 
        'action':'userDataSheetRequest', 
        'password':hash(password)}),
        response
    );
     
}

function userDataSheetUpdate(){
    //var username = document.getElementById("username").value;
    //var password = document.getElementById("password").value;

    console.log(userDataSheet);
    var tempDataSheet = userDataSheet;
    tempDataSheet['diaryEntryList'] = encryptEntries(tempDataSheet['diaryEntryList'], password);
    $.post(url+'?data='+JSON.stringify({
        'username':encrypt(username, password), 
        'action':'userDataSheetUpdate',  
        'userDataSheet': tempDataSheet,
        'password':hash(password)}),
        response
    );
}

function response(data, status){
    var response = JSON.parse(data);
    //alert(response["action"]);
    
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
    tempDataSheet = response["userDataSheet"];
    tempDataSheet['diaryEntryList'] = decryptEntries(tempDataSheet['diaryEntryList'], password);
    userDataSheet = response["userDataSheet"];
    //alert(userDataSheet['username']);
}

function accountCreated(){
    document.getElementById("alertText").innerHTML = "Account Created";
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    window.location="main.html";
}
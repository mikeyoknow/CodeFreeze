var i = 1; //default number of passages

function takeback(){ 
    var x = document.getElementById("userPassword").value;
    if(x==""){
        alert("please fill out the field!")
    }else{
        sessionStorage.setItem('password', x)
        location.href = "login.html";
    }
}

function transfer(){
    var x = document.getElementById("userPassword").value;
    let password = sessionStorage.getItem('password');
    if(x==""){
        alert("please fill out the field!")
    }else{
        if(password==x){
            location.href = "codefreeze.html";
        }else{
            alert("Password is wrong");
        }
    }
}

function DATE(){
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    return m + "/" + d + "/" + y;

}

function Name(){
    let username = sessionStorage.getItem('username');

if (username === null) {
    username = prompt("To make this diary more personal to YOU, please enter your name");
}

if (username != null) {
    document.getElementById("name").innerHTML = username;
    sessionStorage.setItem('username', username);
} else {
    document.getElementById("name").innerHTML = "Welcome, Stranger!";
}
}

function del(){
    var res = prompt("Which pasage do you want to delete?")
    if(res>i){
        alert("Passage doesn't exist");
    }else{
        document.getElementById("psg"+res).style.display = "none";
        document.getElementById("lbl"+res).style.display = "none";
    }
}

function add(){
    i=i+1;
    var user = document.getElementById("user");

    user.append(document.createElement('br'));

    var newL = document.createElement('label');
    newL.setAttribute('id','lbl'+i);
    newL.innerHTML = "Passage #"+i;
    user.append(newL);

    user.append(document.createElement('br'));

    var newT = document.createElement('textarea');
    newT.setAttribute('id', 'psg'+i);
    newT.setAttribute('rows', '10');
    newT.setAttribute('cols', '30');
    user.append(newT);
}

function save(){
    var tempEntryList = [];
    var tempID;
    var tempPassage;

    for(var j = 1; j< i; j++){
        tempID =  document.getElementsByClassName("passage")[j].id;
        tempPassage = document.getElementsByClassName("passage")[j].value;
        tempEntryList.push({'id':tempID, 'content':tempPassage});
    }
    userDataSheet['diaryEntryList'] = tempEntryList;
    console.log(tempEntryList);
    userDataSheetUpdate();
}
function lock(){
    location.href = "login.html";
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

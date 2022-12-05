
/*

const userDataSheet = {
    name: "",
    password: "Doe", //hashed
    diaryEntryList: []
};

const diaryEntry = {
    id: 0,
    title: "",
    content: ""
};

*/

var express = require('express');
var app = express();
var port = 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
    console.log("Get Page");
});

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var z = JSON.parse(req.query['data']);

    console.log(z);
    if (z['action'] == 'login') {
        var username = z['name'];
        var pass = z['pass'];
        if(!isUserValid(username)){
            console.log("Usernotvalid");
            var jsontext = JSON.stringify({
                'action':'userNotFound'
            });
            res.send(jsontext);
        }
        else if(isPassValid(username, pass)){
            var jsontext = JSON.stringify({
                'action':'loginSuccess'
            });
            res.send(jsontext);
            console.log("passvalid");
        }else{
            console.log("Loginfail");
            var jsontext = JSON.stringify({
                'action':'loginFailed'
            });
            res.send(jsontext);
        }
    }else if (z['action'] == 'userDataSheetRequest') {
        var jsontext = JSON.stringify({
            'action':'getUserDataSheet',
            'userDataSheet': readUserDataSheet(username)
        });
        res.send(jsontext);
    } else {
        res.send(JSON.stringify({ 'msg': 'ERROR' }));
    }

}).listen(port);
console.log("Server is running! (listening on port " + port + ")");
test();

function initialize(){

}

function createNameList(){

}

function isUserValid(user){
    var fs = require('fs');
    try {
        fs.readFileSync('UserData/'+user+'.txt', 'utf8');
    } catch (err) {
        return false;
    }
    return true;
}

function isPassValid(user, pass){
    if(readUserDataSheet(user)["pass"] == pass){
        return true;
    }
    return readUserDataSheet(user)["pass"];
}

function getUserList(){
    var userList = [];
    return userList;
}

function updateUserDataSheet(user, userDataSheet){
    var fs = require('fs');
    try {
        fs.writeFileSync('UserData/'+user+'.txt', JSON.stringify(userDataSheet));
        
        
    } catch (err) {
        console.log(err);
        return err;
    }
}

function readUserDataSheet(user){
    var fs = require('fs');
    try {
        return JSON.parse(fs.readFileSync('UserData/'+user+'.txt', 'utf8'));
    } catch (err) {
        console.log(err);
        return err;
    }
}

//pass is hashed, in the form of an int
//content should be string
function encrypt(content, pass){
    var charArray = Array.from(content)
    for(var i = 0; i < charArray.length; i++){
        charArray[i]=pass+charArray[i].charCodeAt(0);
    }
    return charArray;
}

//pass is hashed, in the form of an int
function decrypt(content, pass){
    for(var i = 0; i < content.length; i++){
        content[i]=String.fromCharCode(content[i]-pass);
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

function test(){
    
}
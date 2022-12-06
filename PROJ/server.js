
/*

const userDataSheet = {
    username: "",
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
    var username = z['username'];
    var password = z['password'];
    var action = z['action'];

    if (action == 'login') {
        if(!isUserValid(username)){
            var jsontext = JSON.stringify({'action':'userNotFound'});
            console.log("Usernotvalid");
        }
        else if(isPasswordValid(username, password)){
            var jsontext = JSON.stringify({'action':'loginSuccess'});
            console.log("passvalid");
        }else{
            var jsontext = JSON.stringify({'action':'loginFailed'});
            console.log("Loginfail");
        }
        res.send(jsontext);

    }else if (action == 'userDataSheetRequest') {

        var jsontext = JSON.stringify({
            'action':'userDataSheetReturn',
            'userDataSheet': readUserDataSheet(username)
        });
        console.log("datasheetrequest");
        res.send(jsontext);

    }else if (action == 'userDataSheetUpdate') {

        try{
            updateUserDataSheet(username, userDataSheet);
        }catch(err){
            console.log(err);
            res.send(JSON.stringify({ 'msg': 'ERROR' }));
        }
        var jsontext = JSON.stringify({'action':'dataUpdateSuccess'});
        console.log("datasheetupdate");
        res.send(jsontext);

    }else if (action == 'createNewAccount') {

        if(isUserValid(username)){
            console.log("userexists");
            var jsontext = JSON.stringify({'action':'userExists'});
        }else{
            createNewUser(username, password);
            console.log("accountcreated");
            var jsontext = JSON.stringify({'action':'accountCreated'});
        }
        res.send(jsontext);

    }else{
        res.send(JSON.stringify({ 'msg': 'ERROR' }));
    }


}).listen(port);
console.log("Server is running! (listening on port " + port + ")");
test();

function initialize(){

}

function createNameList(){

}

function isUserValid(username){
    var fs = require('fs');
    try {
        fs.readFileSync('UserData/'+username+'.txt', 'utf8');
    } catch (err) {
        return false;
    }
    return true;
}

function isPasswordValid(username, password){
    if(readUserDataSheet(username)["password"] == password){
        return true;
    }
    return readUserDataSheet(username)["password"];
}

function getUserList(){
    var userList = [];
    return userList;
}

function updateUserDataSheet(username, userDataSheet){
    var fs = require('fs');
    try {
        fs.writeFile('UserData/'+username+'.txt', JSON.stringify(userDataSheet), function (err) {if (err) throw err;console.log('Updated!');});
    } catch (err) {
        console.log(err);
        return err;
    }
}

function createNewUser(username, password){
    var fs = require('fs');
    try {
        var newDataSheet = {'username':username, 'password': password, 'diaryEntryList': []};
        fs.writeFile('UserData/'+username+'.txt', JSON.stringify(newDataSheet), function (err) {if (err) throw err;console.log('Updated!');});
        console.log("New User Created");
    } catch (err) {
        console.log(err);
        return err;
    }
}

function readUserDataSheet(username){
    var fs = require('fs');
    try {
        console.log("readinguserdata");
        return JSON.parse(fs.readFileSync('UserData/'+username+'.txt', 'utf8'));
    } catch (err) {
        console.log(err);
        return err;
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

function test(){
    
}
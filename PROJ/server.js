
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
            updateUserDataSheet(username, z['userDataSheet']);
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
    //console.log(readUserDataSheet(username)["password"]);
    //console.log(password);
    if(readUserDataSheet(username)["password"] === password){
        return true;
    }
    return false;
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
        console.log("readinguserdata:");
        
        console.log(JSON.parse(fs.readFileSync('UserData/'+username+'.txt', 'utf8')));
        return JSON.parse(fs.readFileSync('UserData/'+username+'.txt', 'utf8'));
    } catch (err) {
        console.log(err);
        return err;
    }
}

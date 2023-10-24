const express = require('express')
const cors = require('cors')
const mongo = require('./MongoDB')
const request = require('request')
const app = express()

var multer = require('multer');
var upload = multer();

const bodyParser = require('body-parser');

app.use(cors())
app.use(upload.none())
// app.use(express.static('public'))

app.use(bodyParser.text())


app.post("/checkuser",(req,res)=>{
    var usernames = []
    // console.log(req.body)
    mongo.find().then((data)=>{data.forEach((v)=>{usernames.push(v.Username)});usernames.includes(req.body)?res.send('1'):res.send('0')})
})

app.post("/signup",(req,res)=>{
    let form = JSON.parse(req.body)
    // console.log(form.con_pass)

    const request = require('request');

    const options = {
    method: 'POST',
    url: 'https://api.chatengine.io/projects/c1e2a533-00b3-4b30-8a7d-ca214dd5bbb7/people/',
    headers: {
        'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
        accept: 'application/json, text/plain, */*',
        authorization: 'Token 5d35721b64a6854d868c46c1946f13347653b4eb',
        origin: 'https://chatengine.io',
        referer: 'https://chatengine.io/'
    },
    formData: {
        username: form.name,
        secret: form.pass,
        confirm_secret: form.con_pass,
        email: form.mail,
        first_name: form.fn,
        last_name: form.ln
    }
    };
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    // console.log(body)
    let data = JSON.parse(body)
    if (data.is_authenticated==true){
        res.send("1")
        mongo.insert({Username:form.name,Password:form.pass,Conform_Password:form.con_pass,Email:form.mail,First_Name:form.fn,Last_Name:form.ln})
    }
    else{res.send("0")}
    });
    
    // res.send()
})

app.post("/checklogin",(req,res)=>{
    let form = JSON.parse(req.body)
    mongo.find({Username:form.name}).then((data)=>{
        if (data != []){
            if (data[0].Password == form.pass){
                res.send("1")
            }
            else{
                res.send("0")
            }
        }
        else{
            res.send("0")
        }
    })
})

app.get("/test",(req,res)=>{
    res.send("working")
})

app.listen(5000,(err)=>{
    if (err) {throw err}
    else {console.log('Working.....')}
})


const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
const { log } = require("console");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = " https://us10.api.mailchimp.com/3.0/lists/c14ef20536"
    const options = {
        method: "POST",
        auth: "syed:11b30a43efe23b964d080629af664696-us10"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server listening 3000")
});

// c14ef20536
// 11b30a43efe23b964d080629af664696-us10

/**
 * Created by josh on 9/13/16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var response = require('./pick_response');
var app = express();
app.set("json spaces",4);
app.use(bodyParser.json());
app.get("/response",(req,res)=>{
    console.log("request = ", req.query);
    res.json(response.pick(req.query.action, req.query.term));
});


function startWebserver(app,PORT) {
    return new Promise((resolve,reject) => {
        app.listen(PORT, function() {
            console.log("ready to serve on http://localhost:"+PORT+"/");
        });
    })
}
startWebserver(app,8112).then(()=>console.log("running")).catch((e)=>console.log(e));


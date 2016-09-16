export default (request) => { 
    const pubnub = require('pubnub');
    const kvstore = require('kvstore');
    const xhr = require('xhr');
    const query = require('codec/query_string');
    const basicAuth = require('codec/auth');

    console.log(request.message); // Log the request envelope passed 
 
    var endpoint = "http://joshondesign.com:8112";
    var path = '/response';
    var url = endpoint+path+'?'+query.stringify(request.message);

    return xhr.fetch(url).then((x)=>{
        var ret = JSON.parse(x.body);
        console.log('JSON response ', ret, typeof ret);
        if(typeof ret === 'string') {
            ret = { text: ret }
        }
        var msg = {
            original:request.message.text,
            response:ret,
        }
        if(request.message.originalLanguage !== 'english') {
            console.log("should translate first");
            return translateMessage(msg, request.message.originalLanguage);
        }
        console.log("forwarded on to chatbot-response",msg);
        pubnub.publish({channel:'chatbot-response',message:msg});
        return request.ok();
    });
    
    function translateMessage(msg,lang) {
        const http_options = {
            method:'GET',
            headers:{
                'Authorization': basicAuth.basic("fee6cf06-2d25-4a4d-bfb0-d988dc8bd908", "i8wm8e5mlT01"),
            }
        }
        var options = {
            source:'en',
            target:lang,
            text: msg.response.text
        }
        console.log("final options = ", options);
        var url = "https://gateway.watsonplatform.net/language-translation/api"
            +'/v2/translate'
            +'?'+query.stringify(options);
        console.log("translation url = ", url);
        console.log("http options",http_options);
        return xhr.fetch(url, http_options).then((trans) => {
            console.log("ret is",trans.body);
            msg.response.text = trans.body;
            //msg.response.text = "No frenchy understandy";
            //msg.response.img = 'http://i.giphy.com/l2Je8k52tYz68HAhG.gif';
            msg.language = lang;
            console.log("final message is",msg);
            pubnub.publish({channel:'chatbot-response',message:msg});
            return request.ok();
        });
    }

   
    //send a request to joshondesign.com:xxxxx to get a response for a given action and term and original text
    return request.ok(); // Return a promise when you're done 
}
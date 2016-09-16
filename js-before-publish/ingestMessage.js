export default (request) => { 
    console.log("got",request);
    console.log("incoming message ",request.message.text, request.message.originalLanguage);

    //send the text to Alchemy for processing
    const pubnub = require('pubnub');
    const xhr = require('xhr');
    const query = require('codec/query_string');
    const basicAuth = require('codec/auth');
    const query_params = {
        outputMode:'json',
        apikey:'494a8df6f920d85b1de4a8172c21dbc264d6446f',
        extract:'keywords,relations,language',
        maxRetrieve: 1,
        text:request.message.text
    };
    var endpoint = "http://gateway-a.watsonplatform.net/calls";
    var path = '/text/TextGetCombinedData';
    var url = endpoint+path+'?'+query.stringify(query_params);

    console.log('fetching',url);
    return xhr.fetch(url).then((x)=>{
        var ret = JSON.parse(x.body);
        console.log('got back from IBM', ret);
        if(ret.language != 'english') {
            console.log("not in english. must translate");
            return translateMessage(request.message, ret.language);
        }
        return cookMessage(ret);
    }).catch((e)=>{
       console.log("caught an error",e);
    });

    function cookMessage(parsed) {
        var msg = {
            original:request.message.text,
            parsed:parsed.relations[0],
            originalLanguage:request.message.originalLanguage
        }
        console.log("forwarded on to cook-message",msg);
        pubnub.publish({channel:'cook-message',message:msg});
        return request.ok();
    }    
    function translateMessage(msg,lang) {
        var cred = {
            "url": "https://gateway.watsonplatform.net/language-translation/api",
            "password": "i8wm8e5mlT01",
            "username": "fee6cf06-2d25-4a4d-bfb0-d988dc8bd908"
        }
        const http_options = {
            method:'GET',
            headers:{
                //'Content-Type':'application/json',
                'Authorization': basicAuth.basic(cred.username, cred.password),
            }
        }
        

        var endpoint = cred.url;
        var path = '/v2/translate';
        var url = endpoint+path+'?'+query.stringify({
                source:lang,
                target:'en',
                text:request.message.text
            });
        console.log("translation url = ", url);
        console.log("options",http_options);
        return xhr.fetch(url, http_options).then((x) => {
            console.log("ret is",x.body);
            pubnub.publish({channel:'chatbot',message:{text:x.body, originalLanguage:lang}});
            return request.ok();
        });
    }

}
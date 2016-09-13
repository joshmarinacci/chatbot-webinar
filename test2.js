/**
 * Created by josh on 9/13/16.
 */
var util = require('util');
var rp = require('request-promise-native');

var responses = require('./pick_response');
//init alchemy
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var cred = {
    "credentials": {
        "url": "https://gateway-a.watsonplatform.net/calls",
        "note": "It may take up to 5 minutes for this key to become active",
        "apikey": "494a8df6f920d85b1de4a8172c21dbc264d6446f"
    }
};
var alchemy_language = new AlchemyLanguageV1({
    api_key: cred.credentials.apikey
});


var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var language_translation = {
    "credentials": {
        "url": "https://gateway.watsonplatform.net/language-translation/api",
        "password": "i8wm8e5mlT01",
        "username": "fee6cf06-2d25-4a4d-bfb0-d988dc8bd908"
    }
};
var language_translator = new LanguageTranslatorV2({
    username:language_translation.credentials.username,
    password:language_translation.credentials.password

});


function proc(text) {
    console.log("processing the message", text);
    sendAlchemy(text).then((parsed) => {
        console.log("parsed is",parsed);
        if(parsed.language !== 'english') return sendTranslate(text, parsed.language).then((trans)=>{
            console.log("got back in english",trans);
            return sendAlchemy(trans.translations[0].translation);
        });
        return parsed;
    }).then((parsed)=> {
        console.log("final parsed is", parsed);
        return cook(parsed.relations[0], text)
    }).then((cooked)=> {
        console.log("the cooked version is", cooked);
        return getResponse(cooked);
    }).then((resp)=>{
        console.log("final response is",resp, typeof resp);
    }).catch((e)=>{
        console.log("error = ", e);
    })
}



function sendTranslate(text, lang) {
    return new Promise((res,rej)=>{
        language_translator.translate({ text: text, source: lang, target:'en'}, (err,trans)=>{
            //console.log("got back",err,trans);
            if (err) return rej(err);
            res(trans);
        })
    });
}

function sendAlchemy(text) {
    return new Promise((res,rej)=>{
        var parameters = {
            extract: 'keywords,relations,language',
            maxRetrieve: 1,
            text:text,
        };
        alchemy_language.combined(parameters, function (err, response) {
            if (err) return rej(err);
            res(response);
        });
        //return res(text);
    });
}


function cook(parsed, original) {
    return new Promise((res,rej)=>{
        console.log("cooking",util.inspect(parsed, {depth:null}));

        if(typeof parsed === 'undefined') {
            console.log("the parse failed on original text", original);
            original = original.replace("?",""); // strip question marks
            var mtch = original.match(/what is (.*)/i);
            if(mtch) {
                console.log("match is", mtch);
                var term = mtch[1];
                if (term) {
                    return res({action: 'knowledge', 'term': term});
                }
            }
            if(original.match(/food/i))  return res({action:'favorites',term:'food'});
            if(original.match(/movie/i)) return res({action:'favorites',term:'movie'});
            if(original.match(/music/i)) return res({action:'favorites',term:'music'});
            if(original.match(/help/i))  return res({action:'help'});

            console.log("couldn't determine anything to do");
            return res({action:'random'});

        }

        if(parsed.action.lemmatized.toLowerCase() == 'do' && parsed.subject.text == 'food') {
            return res({action:'favorites',term:'food'});
        }
        if(parsed.action.lemmatized.toLowerCase() == 'tell' && parsed.subject.text == 'a joke') {
            return res({action:'joke'})
        }

        console.log("couldn't determine anything to do");
        return res({action:'random'});
    })
}

function getResponse(cooked) {
    var options = {
        uri: 'http://localhost:8112/response',
        qs: {
            action:cooked.action,
            term:cooked.term
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options).then((json)=>{
        return json;
    });
/*
    return new Promise((res,rej)=>{
        return res(responses.pick(cooked.action, cooked.term));
    });*/
}



//proc(process.argv[2]);
//proc('Raconte moi une blague');
proc('What is feldspar?'); // known term
//proc('What is quartzite?'); //unknown term
//proc('what is gneiss');
//proc('What is quartz?');
//proc('What food do you like to eat?');
//proc('what is your favorite food?');
//proc('What is your favorite  movie?');
//proc('what is your favorite thing to do?');
//proc('help!');
//proc('hello!');

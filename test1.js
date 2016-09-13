//NAME Credentials-1
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var util = require('util');

console.log("foo");

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


var parameters = {
    extract: 'keywords,relations,language',
    maxRetrieve: 1,
    //text:'What is the hardest kind of sedimentary rock?'
    //text:'What is gneiss?'
    //text: "What is gneiss?",
    //--text:"What is sedimentary rock?",
    //text:'tell me a joke please'
    //text:'tell me a joke'
    //--text:'what is your favorite kind of food?'
    //text:'what food do you like to eat?'
    //--text:'please tell me about gneiss',
    //text:'do you like gneiss?',
    //text:'What music do you listen to?',
    //---text:'Raconte moi une blague',
    text:'help',
};

alchemy_language.combined(parameters, function (err, response) {
    if (err) {
        console.log('error:', err);
    } else {
        console.log(JSON.stringify(response, null, 2));
        var rel = response.relations;
        console.log("relations = ");
        console.log(util.inspect(rel, {depth:null}));
    }
});


/*


subject: what
action: be
object: keywords: hardest kind, text: the hardest kind of sedimentary rock
if object text contains rock, or sedimentary rock then map to a query

what, be, text:gneiss   return link for gneiss and short description
what is granite doesn't return, so fall back to simple pattern matching:


patterns:
    what is X?


tell me a joke:
subject: 'a joke', keywords: 'joke'
action: verb, tell
object: 'me',

becomes joke tell me

tell me a joke please
becomes the same output




what is your favorite kind of food doesn't match
what food do you like to eat does match:
    subject: food, action: do, object: you

please tell me about gneiss doesn't match
do you like gneiss?
    becomes subject: you, action: like, object: gneiss.

 */
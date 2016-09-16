export default (request) => { 
    const pubnub = require('pubnub');
    const kvstore = require('kvstore');
    const xhr = require('xhr');

    console.log(request.message); // Log the request envelope passed

    
    var original = request.message.original;
    var parsed = request.message.parsed;
    var originalLanguage = request.message.originalLanguage || 'english';

    function respond(action, term) {
        pubnub.publish({channel:'fetch-response',message:{
            action:action,
            term:term, 
            original:original,
            originalLanguage:originalLanguage
        }});
        return request.ok(); // Return a promise when you're done 
    }
    
    console.log("parsed is", parsed);
    if(parsed && parsed.action && parsed.action.lemmatized) {
        if(parsed.action.lemmatized.toLowerCase() == 'tell' && parsed.subject.text == 'a joke') {
            return respond('joke');
        }
        if(parsed.action.lemmatized.toLowerCase() == 'do' && parsed.subject.text == 'food') {
            return respond('favorites','food');
        }
    }
    
    
    console.log("doing backup");
    if(original.match(/food/i))  return respond('favorites','food');
    if(original.match(/movie/i)) return respond('favorites','movie');
    if(original.match(/music/i)) return respond('favorites','music');
    if(original.match(/help/i)) return respond(help);

    original = original.replace("?",""); // strip question marks
    var mtch = original.match(/what is (.*)/i); // look for what is questions
    if(mtch) {
        console.log("match is", mtch);
        var term = mtch[1];
        if (term) {
            //return res({action: 'knowledge', 'term': term});
            console.log("can do knowledge",term);
            return respond('knowledge',term);
        }
    }

    return respond('random');
}
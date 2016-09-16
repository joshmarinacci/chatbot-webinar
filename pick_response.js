/**
 * Created by josh on 9/13/16.
 */
var responses = {
    'favorites':{
        'movie': [
            'My favorite movie is The Rock.',
            'I love any movie starting Dwayne "The Rock" Johnson.',
            "Indiana Jones is a great archeologist",
            "Tremors, when giant earthworms attack!",
            "The Core. Horribly inaccurate, but super fun."
        ],
        'music': [
            'You’d expect my favorite music is Rock and Roll, but it’s actually smooth jazz.',
            'I listen to a lot of the Rolling Stones. Never take them from granite.',
            'Queen. They will rock you!',
            'All Shook Up by Elvis Presley is great',
            "Natalie Merchant's San Andreas Fault is a good song"
        ],
        'food': [
            { text:'My favorite food is rockfish, of course.', img:'http://i.giphy.com/WBZakt3KlACA.gif'},
            { text:'I love rock candy for dessert.', img:'http://i.giphy.com/l2Je8k52tYz68HAhG.gif'},
            { text:'Rock Road ice-cream is my favorite.', img:'http://i.giphy.com/119RUrUonvmBJC.gif'},
            { text:'I do love a good dirt cupcake.', img:'http://i.giphy.com/nWL1HKnm0Rs52.gif'},
            "I don't each much, but when I do it's very gneiss.",
            { text: "Cake, but only if it has nice layers", img:"http://i.giphy.com/l2R09XhMCXqUmyv0Q.gif"},
        ]
    },
    random: [
        "I think you rock!",
        "Mr Rockbot here. Are you having a nice day?",
        "When you rock, remember it's spelled ROCK, not spelled RAWK.",
        "You know what they say a diamond is a robot's best friend.",
        "Come on. My jokes rock! Ask me some more!",
        "Always remember, it’s the sediment that counts.",
        "Do you enjoy rocking out?",
        "Tell me more about your mother. Was she igneous?"
    ],
    joke:[
        "Did you hear the one about the geologist? He took his wife for granite so she left him.",
        "Watson: Holmes! What kind of rock is this! Holmes: Why it's sedimentary, my dear Watson.",
        "Q: How did the geology student drown? A: His grades were below C-level.",
        "Q: Why shouldn't you let a geologist drive your car? A: Because they get hammered and stoned.",
        "Q: What do geologists call a benzene ring with iron atoms replacing the carbon atoms? A: A ferrous wheel.",
        "Q: What fruit contains Barium and double Sodium? A: BaNaNa!",
        "Q: Why wasn't the geologist hungry? A: He lost his apatite.",
        "Did you hear oxygen and magnesium got together? OMg!",
        "Geologists don't wrinkle, they show lineation!",
        "Geology Rocks, I really dig it.",
        "You know what they say about geologists. They will date anything."
    ],
    knowledge: {
        'gneiss': {
            'text':'Gneiss (pronunciation: /ˈnaɪs/) is a common distributed type of rock formed by high-grade regional metamorphic processes from pre-existing formations that were originally either igneous or sedimentary rocks. It is often foliated (composed of layers of sheet-like planar structures). The foliations are characterized by alternating darker and lighter colored bands, called "gneissic banding".',
            'url':'https://en.wikipedia.org/wiki/Gneiss',
            'img':'https://upload.wikimedia.org/wikipedia/commons/6/60/Gneiss.jpg'
        },
        'granite': {
            'text':'Granite (pronunciation: /ˈɡrænᵻt/) is a common type of felsic intrusive igneous rock that is granular and phaneritic in texture. Granites can be predominantly white, pink, or gray in color, depending on their mineralogy. ',
            'url':'https://en.wikipedia.org/wiki/Granite',
            'img':'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Fjæregranitt3.JPG/640px-Fjæregranitt3.JPG'
        },
        'basalt':{
            'text':'Basalt (pronounced /bəˈsɔːlt/, /ˈbæsɒlt/, /ˈbæsɔːlt/, or /ˈbeɪsɔːlt/)[1] is a common extrusive igneous (volcanic) rock formed from the rapid cooling of basaltic lava exposed at or very near the surface of a planet or moon.',
            'url':'https://en.wikipedia.org/wiki/Basalt',
            'img':'https://upload.wikimedia.org/wikipedia/commons/0/08/BasaltUSGOV.jpg'
        },
        'quartz':{
            'text':"Quartz is the second most abundant mineral in Earth's continental crust, after feldspar. Its crystal structure is a continuous framework of SiO4 silicon–oxygen tetrahedra, with each oxygen being shared between two tetrahedra, giving an overall chemical formula of SiO2.",
            'url':'https://en.wikipedia.org/wiki/Quartz',
            'img':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Quartz%2C_Tibet.jpg/479px-Quartz%2C_Tibet.jpg'
        },
        'feldspar':{
            'text':"Feldspars (KAlSi3O8 – NaAlSi3O8 – CaAl2Si2O8) are a group of rock-forming tectosilicate minerals that make up as much as 60% of the Earth's crust. Feldspars crystallize from magma as veins in both intrusive and extrusive igneous rocks and are also present in many types of metamorphic rock.",
            'url':"https://en.wikipedia.org/wiki/Feldspar",
            'img':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Feldspar-Group-291254.jpg/283px-Feldspar-Group-291254.jpg',
        },
        'slate':{
            "text":"Slate is a fine-grained, foliated, homogeneous metamorphic rock derived from an original shale-type sedimentary rock composed of clay or volcanic ash through low-grade regional metamorphism. It is the finest grained foliated metamorphic rock. Foliation may not correspond to the original sedimentary layering, but instead is in planes perpendicular to the direction of metamorphic compression.",
            "url":"https://en.wikipedia.org/wiki/Slate",
            'img':'https://upload.wikimedia.org/wikipedia/commons/a/af/SlateUSGOV.jpg',
        },
        'sedimentary':{
            "text":"Sedimentary rocks are types of rock that are formed by the deposition and subsequent cementation of that material at the Earth's surface and within bodies of water. Sedimentation is the collective name for processes that cause mineral and/or organic particles (detritus) to settle in place. The particles that form a sedimentary rock by accumulating are called sediment. Before being deposited, the sediment was formed by weathering and erosion from the source area, and then transported to the place of deposition by water, wind, ice, mass movement or glaciers, which are called agents of denudation. Sedimentation may also occur as minerals precipitate from water solution or shells of aquatic creatures settle out of suspension.",
            "url":"https://en.wikipedia.org/wiki/Sedimentary_rock",
            'img':'https://upload.wikimedia.org/wikipedia/commons/6/61/SandstoneUSGOV.jpg'
        },
        'igneous':{
            "text":"Igneous rock (derived from the Latin word ignis meaning fire) is one of the three main rock types, the others being sedimentary and metamorphic. Igneous rock is formed through the cooling and solidification of magma or lava. Igneous rock may form with or without crystallization, either below the surface as intrusive (plutonic) rocks or on the surface as extrusive (volcanic) rocks. This magma can be derived from partial melts of existing rocks in either a planet's mantle or crust. Typically, the melting is caused by one or more of three processes: an increase in temperature, a decrease in pressure, or a change in composition.",
            "url":"https://en.wikipedia.org/wiki/Igneous_rock",
            'img':'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Igneous_rock_eng_text.jpg/601px-Igneous_rock_eng_text.jpg'
        },
        'metamorphic':{
            "text":"Metamorphic rocks arise from the transformation of existing rock types, in a process called metamorphism, which means 'change in form'.[1] The original rock (protolith) is subjected to heat (temperatures greater than 150 to 200 °C) and pressure (1500 bars),[2] causing profound physical and/or chemical change. The protolith may be a sedimentary rock, an igneous rock or another older metamorphic rock.",
            "url":"https://en.wikipedia.org/wiki/Metamorphic_rock",
            'img':'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Rock_contact_metamorphism_eng_big_text.jpg/640px-Rock_contact_metamorphism_eng_big_text.jpg',
        }
    },

    "help": [
        "I am MR ROCKBOT. \nYou can ask me questions like:\n What is feldspar? \n Tell me a joke\n What is your favorite movie?"
    ]
};


function pick(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

module.exports.pick = function(action, term) {
    if(action == 'knowledge') {
        if(module.exports.hasKnowledge(term)) {
            return responses.knowledge[term];
        } else {
            return pick(responses.random);
        }
    }
    console.log("picking action",action,term);
    if(action == 'favorites') {
        return pick(responses.favorites[term]);
    }
    if(responses[action]) return pick(responses[action]);
    return { error:"unknown action " + action};
//    return pick(responses[action]);
};

module.exports.hasKnowledge = function(term) {
    return typeof responses.knowledge[term] !== 'undefined';
};


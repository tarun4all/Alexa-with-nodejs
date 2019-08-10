var express = require("express");
var alexa = require("alexa-app");
var express_app = express();
 
var app = new alexa.app("codalien");
var shell = require('shelljs');
 
app.intent("order", {
    "slots": { "food": ['biryani'], "source": ['swiggy'] },
    "utterances": ["order {food} from {swiggy}"]
  },
  async function(request, response) {
    var food = request.slot("food");
    var source = request.slot("source");

    console.log(food, ">>>", source);
    var link = '';
    if(food && source && source == "swiggy") {
        link = `https://www.swiggy.com/search?q=${food}`;
    } else if(food && source && source == 'zomato') {
        link = `https://www.zomato.com/ncr/restaurants/${food}`;
    } else {
        response.say("Sorry no app found");
    }

    console.log(link);
    if(link) {
        shell.exec(`google-chrome ${link}`);
        response.say("Here we go. Watch your desktop");
    }
  }
);
 
// setup the alexa app and attach it to express before anything else
app.express({ expressApp: express_app });

express_app.listen(3000, () => {
    console.log("alexa server running..");
})

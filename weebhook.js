'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named My Weight and Height.
// The intent collects a parameter named weight and length.
app.intent('My Weight and Height',(conv,{weight,length}) => {
  
  const lengthSize = length.size();  
  var w = weight.amount;
  var h = 0, h1 = 0, h2 = 0;
    
    //changing the length measures
  if(lengthSize === 1){
    h = length.amount;
    switch(length.unit){
      case "m":
        h = h;
        break;
      case "cm":
          h = h/100;
        break;
      case "ft":
        h = h*(0.3048);
        break;
      case "inch":
        h = h*(0.0254);
        break;
      default:
        break;
    }   
  } else if(lengthSize === 2){
  	h1 = length[1].amount;
    h2 = length[2].amount;
  } 
    var bmi = w/(h*h);
    bmi = Math.round(bmi * 100)/100;
    var health = "";
    var conclusion = "";
    if(bmi< 18.5){
            health = "underweight";
            conclusion = "Now you need to put on some weight. Take proper diet including calories and protein and good fat. If this doesn't help, consult a dietician.";
    }
    else if(bmi >= 18.5 && bmi <= 24.9){
            health = "healthy";
            conclusion = "Great going. Keep maintaining your balanced diet and be fit.";
            
    }
    else if(bmi >= 25.0 && bmi <= 29.9){
            health = "overweight";
            conclusion = "That's not good. You need to have healthy diet. Start some physical activities.";
      
    }
    else if(bmi >= 30.0){
            health = "obese";
            conclusion = "Hey! you should consult a dietician and start a proper workout session.";
    }
    
    // Respond with the user's BMI.
    conv.close('Your BMI is ' + bmi + " and according to it you are " + health+ ". " + conclusion);
             
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

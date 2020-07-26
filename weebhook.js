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
  
  var w = 0;
  var h = 0;
  var h1 = 0;
  var h2 = 0;
    
  //changing the weight measures
  switch(weight.unit){
    case "kg":
      w = w;
      break;
    case "g":
      w = w/1000;
      break;
    case "lbs":
      w = w*(0.45359);
      break;
    default:
      break;
  }
  
  var ls = length.length;
  if (ls === 1){
  	ls = 3
  } else if (ls === 2) {
  	ls = 4
  }
  //changing the length measures
  /*switch(length.length){
    case 1:
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
      break;
    
  //} else if(length.length == 2){
  	case 2:
    h1 = length[1].amount;
    h2 = length[2].amount;
    
    switch(length[1].unit){
      case "m":
        h1 = h1;
        break;
      case "cm":
          h1 = h1/100;
        break;
      case "ft":
        h1 = h1*(0.3048);
        break;
      case "inch":
        h1 = h1*(0.0254);
        break;
      default:
        break;
    }
    switch(length[2].unit){
      case "m":
        h2 = h2;
        break;
      case "cm":
          h2 = h2/100;
        break;
      case "ft":
        h2 = h2*(0.3048);
        break;
      case "inch":
        h2 = h2*(0.0254);
        break;
      default:
        break;
    }  
      break;
    default:
      break;
  } 
    */
  var bmi = w/(h*h);
  bmi = Math.round(bmi * 100)/100;
  var health = "";
  var conclusion = "";
  if(bmi < 18.5){
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
  conv.close('Your BMI is ' + length[0].unit + " and according to it you are " + length[1].unit + ". " + ls);
             
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

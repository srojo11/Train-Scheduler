







  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNjfAFkyFWQM80-XTM_b4UhRp4gHpSdm8",
    authDomain: "swrapp-f890b.firebaseapp.com",
    databaseURL: "https://swrapp-f890b.firebaseio.com",
    projectId: "swrapp-f890b",
    storageBucket: "swrapp-f890b.appspot.com",
    messagingSenderId: "330186136228"
  };


  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var trainDest = "";
var trainFirst = "";
var	trainFrequency = "";


$("#add-train-btn").on("click", function(event) {

event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainFirst =$("#first-input").val().trim();
var	trainFrequency = $("#frequency-input").val().trim();




console.log(trainFirst);
// Creates local "temporary" object for holding employee data

 var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    frequency: trainFrequency
  };



  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

// Alert
  alert("Train successfully added");


$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());


	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().first;
	var trainFrequency = childSnapshot.val().frequency;

    
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFrequency);


	var firstTime = trainFirst;
	var tFrequency = trainFrequency;
	console.log(firstTime);
	console.log(tFrequency);


  	// First Time
	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	console.log("First Time: " + firstTimeConverted);

	// Current Time
	var currentTime = moment();	
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);
  
  	// Minutes Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextTrainPretty = moment(nextTrain).format("hh:mm");

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" 
	+ trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain + "</td></tr>");


});




/*var trainStartPretty = moment.unix(trainFirst).format("MM/DD/YY");
var trainTime = moment().diff(moment.unix(trainFirst, "X"), "months");
console.log(trainTime)

var trainBilled = trainTime * trainFrequency;
console.log(trainBilled)*/









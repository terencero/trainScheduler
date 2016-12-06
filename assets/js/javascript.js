 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjCKaqeamgkXWGwueklfjXhRwGMI20Z28",
    authDomain: "trainscheduler-1d7b0.firebaseapp.com",
    databaseURL: "https://trainscheduler-1d7b0.firebaseio.com",
    storageBucket: "trainscheduler-1d7b0.appspot.com",
    messagingSenderId: "717045583470"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName;
  var trainDestination;
  var firstTime;
  var trainFrequency;

// time format using bootstrap timepicker js
  $('#first-train-time').timepicker({
                minuteStep: 1,
                template: 'modal',
                appendWidgetTo: 'body',
                showSeconds: false,
                showMeridian: false,
                defaultTime: false
            });

// First Time (pushed back 1 year to make sure it comes before current time)
 	
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);    

// Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder); 

// Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));     


 $('#add-train-btn').on('click', function () {

  trainName = $('#train-name').val().trim();
  trainDestination = $('#destination').val().trim();
  firstTime = $('#first-train-time').val().trim();
  trainFrequency = $('#frequency').val().trim();

	  $('#train-table').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');

	  database.ref().push({

	  	trainName: trainName,
	  	trainDestination: trainDestination,
	  	firstTime: firstTime,
	  	trainFrequency: trainFrequency

	  });

		console.log(trainName);
		console.log(trainDestination);
		console.log(firstTime);
		console.log(trainFrequency);  

		return false;
});

    

 	database.ref().on('value', function(snapshot) {

 		console.log(snapshot.val());

 		// $('#train-table').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>');

 	});
 	
 	
      console.log("CURRENT TIME: " + moment().format("hh:mm"));

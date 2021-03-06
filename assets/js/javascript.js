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

// grab value input from user after clicking submit button
 $('#add-train-btn').on('click', function () {

  trainName = $('#train-name').val().trim();
  trainDestination = $('#destination').val().trim();
  firstTime = $('#first-train-time').val().trim();
  trainFrequency = $('#frequency').val().trim();
// push user input to firebase
	  database.ref().push({

	  	trainName: trainName,
	  	trainDestination: trainDestination,
	  	firstTime: firstTime,
	  	trainFrequency: trainFrequency

	  });

return false;
});

// grab user input updates from firebase
database.ref().on('child_added', function(snapshot){

	trainName = snapshot.val().trainName;
	trainDestination = snapshot.val().trainDestination;
	firstTime = snapshot.val().firstTime;
	trainFrequency = snapshot.val().trainFrequency;

// First Time (pushed back 1 year to make sure it comes before current time)
 	
    var firstTimeConverted = moment(firstTime, 'hh:mm a').subtract(1, 'years');
    console.log(firstTimeConverted);

// Current Time
    var currentTime = moment().format('hh:mm a');
    console.log('CURRENT TIME: ' + currentTime);

// Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
      console.log('DIFFERENCE IN TIME: ' + diffTime);    

// Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder); 

// Minutes until the next train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log('MINUTES TILL TRAIN: ' + tMinutesTillTrain);

// Next Train
    var nextArrival = moment().add(tMinutesTillTrain, 'minutes').format('hh:mm a');
    console.log('ARRIVAL TIME: ' + nextArrival);

// append the calculations and user input after grabbing update from firebase child added snapshot

    $('#train-table').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td><td>' + nextArrival + '</td><td>' + tMinutesTillTrain + '</td></tr>');

// };       	
 	return false;
}); 	





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

 $('#add-train-btn').on('click', function () {

  trainName = $('#train-name').val().trim();
  trainDestination = $('#destination').val().trim();
  firstTime = $('#first-train-time').val().trim();
  trainFrequency = $('#frequency').val().trim();

  database.ref().set({

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

 		$('#train-table').append('<tr><td>' + trainName + '</td><td>' + trainDestination + '</td><td>' + trainFrequency + '</td></tr>');

 	});
 	
 	
      console.log("CURRENT TIME: " + moment().format("hh:mm"));

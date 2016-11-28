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

  var trainName = $('#train-name').val().trim();
  var trainDestination = $('#destination').val().trim();
  var firstTime = $('#first-train-time').val().trim();
  var trainFrequency = $('#frequency').val().trim();

  database.ref().set({

  	trainName: trainName,
  	trainDestination: trainDestination,
  	firstTime: firstTime,
  	trainFrequency: trainFrequency
  	
  });
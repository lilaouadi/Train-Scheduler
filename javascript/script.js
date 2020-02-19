
var config = 
{
		apiKey: "AIzaSyCHs-7xgmKKo1WDzlRbPF3-xr3C6HygmQI",
		authDomain: "train-scheduler-227eb.firebaseapp.com",
		databaseURL: "https://train-scheduler-227eb.firebaseio.com",
		projectId: "train-scheduler-227eb",
		storageBucket: "train-scheduler-227eb.appspot.com",
		messagingSenderId: "653465204101",
		appId: "1:653465204101:web:46780b89c5ed407f8140ec"
};
  
 firebase.initializeApp(config);
 var trainData = firebase.database();
$("#submit-btn").on("click", function(event){
	event.preventDefault();

	var trainName = $("#name").val().trim();
	var destination = $("#destination").val().trim();
	var frequency = $("#frequency").val().trim();
	var firstTrainTime = $("#time").val().trim();

	var newTrain = {
		trainName:trainName,
		destination: destination,
		firstTrain: firstTrainTime,
		frequency: frequency
	}
	console.log(newTrain);
	trainData.ref().push(newTrain);
	console.log("train info added to DB");

})
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());
	var name = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;
	var timeArr = firstTrain.split(":");
	var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
	var maxMoment = moment.max(moment(), trainTime);
	var tMinutes;
	var tArrival;

	if(maxMoment == trainTime){
		tArrival = trainTime.format("hh:mm A");
		tMinutes = trainTime.diff(moment(), "minutes")
	}
	else{
		var differenceTime = moment().diff(trainTime, "minutes");
		var tRemainter = differenceTime % frequency;
		tMinutes = frequency - tRemainter;
		tArrival = moment().add(tMinutes, "m").format("hh:mm A");
	
	}
	$("#schedule").append(
		$("<tr>").append(
			$("<td>").text(name),
			$("<td>").text(destination),
			$("<td>").text(frequency),
			$("<td>").text(tArrival),
			$("<td>").text(tMinutes),
		)
	)


})


// var firebaseDataObject = null;

//  var updateKey;

 
//  var name;
//  var destination;
//  var time;
//  var frequency;
// function Train(name, destination, firstTrainTime, frequency)
//  {

//  	this.name = name;
//  	this.destination = destination;
//  	this.firstTrainTime = firstTrainTime;
//  	this.frequency = frequency;

//  };

//   $(document).ready(function(){


// 	$("#current-time").text(moment().format("MMM DD hh:mm A"));


// 	setInterval(function(){

// 		$("#current-time").text(moment().format("MMM DD hh:mm A"));
// 		displayTrainSchedule();

// 	},60000);

// 	database.ref().on("value",function(data){
		
// 		firebaseDataObject = data.val();
// 		displayTrainSchedule(); 		
// 	}, 

// 	function(objectError)
// 	{
// 		console.log("error:" + objectError.code);
// 	});

// });



// $("#submit-btn").on("click", function(event){

//  	event.preventDefault();

 	
//  	if(getInputValues())
//  	{

 		
// 	 	var firstTrainTime = firstTimeString(time);

	 	
// 	 	var newTrain = new Train(name, destination, firstTrainTime, frequency);
	 		
	 
// 	 	database.ref().push( newTrain ); 		

//  	}

// });



// $(document).on("click", ".update", function()
// {

// 	updateKey = $(this).attr("key");
// 	displayUpdate()

// });

// $("#close-btn").on("click", function(event)
// {
// 	event.preventDefault();

// 	updateDone();

// });

// $("#update-btn").on("click", function(event)
// {
// 	event.preventDefault();

// 	updateTrain();

// });

// $("#add-train-btn").on("click", function(event)
// {
// 	event.preventDefault();

// 	$("#submit-btn").css("display", "initial");
// 	$("#add-panel").slideToggle();

// });


// function getNextArrival(time, frequency)
// {

// 	var nextArrival = moment(time);
 
//  	while(nextArrival < moment()) 	
//  	{ 		
//  		nextArrival.add(frequency, "minutes"); 
// 	};

// 	return nextArrival;

// }


// function getMinutesAway(time)
// {

// 	var minutesAway = Math.round(getNextArrival(time).diff(moment(),"minutes",true));



// 	return (minutesAway === 0) ? "Arrived" : minutesAway

// }
// function displayTrainSchedule()
// {
	
// 	$("#schedule").empty();

// 	if(firebaseDataObject !== null)
// 	{	
		
// 		Object.keys(firebaseDataObject).forEach(function(key)
// 		{		 		
// 			var firebaseConfig = {
// 				apiKey: "AIzaSyCHs-7xgmKKo1WDzlRbPF3-xr3C6HygmQI",
// 				authDomain: "train-scheduler-227eb.firebaseapp.com",
// 				databaseURL: "https://train-scheduler-227eb.firebaseio.com",
// 				projectId: "train-scheduler-227eb",
// 				storageBucket: "train-scheduler-227eb.appspot.com",
// 				messagingSenderId: "653465204101",
// 				appId: "1:653465204101:web:46780b89c5ed407f8140ec"
// 			  };

// 	 		var newTableRow = $("<tr>");
// 	 		newTableRow.append($("<td>").html(name)); 		
// 	 		newTableRow.append($("<td>").html(destination));
// 	 		newTableRow.append($("<td>").html(frequency));
// 	 		newTableRow.append($("<td>").html(nextArrival.format("MMM DD hh:mm A")));
// 	 		newTableRow.append($("<td>").html(minutesAway));

// 	 		var newDiv = $("<div>") 
// 	 		newDiv.addClass("update");		
// 	 		newDiv.attr(
// 	 		{	 			
// 	 			"key" : key,
// 	 			"data-toggle" : "tooltip",
// 	 			"data-placement" : "left",
// 	 			"title" : "Update"
// 	 		});
// 	 		newDiv.html("<span class='glyphicon glyphicon-edit pop'></span>");
// 			newTableRow.append($("<td>").html(newDiv));
			
// 			// Creates 'Remove' <div>s for each train with attr 'key' of object key
// 	 		var newDiv = $("<div>") //$("<button>")
// 	 		newDiv.addClass("remove");
// 	 		newDiv.attr(
// 	 		{	 			
// 	 			"key" : key,
// 	 			"data-toggle" : "tooltip",
// 	 			"data-placement" : "left",
// 	 			"title" : "Remove"
// 	 		});
// 	 		newDiv.html("<span class='glyphicon glyphicon-trash pop'></span>");
// 			newTableRow.append($("<td>").html(newDiv));		

// 	 		$("#schedule").append(newTableRow);

	 				
// 		});
	
// 	}	

// }
// function firstTimeString(time)
// {
	
// 	var currentDateString = moment().format("YYYY-MM-DD");

		
// 	return (currentDateString + "T" + time);

// }
// function pad(time) 
// {
	
// 	var array = time.split(":");
	
	
// 	array[0] = parseInt(array[0]); 
// 	array[1] = parseInt(array[1]); 

// 	if (array[0] < 10)
// 	{
// 		array[0] = '0' + array[0];
// 	}

// 	if (array[1] < 10)
// 	{
// 		array[1] = '0' + array[1];
// 	}
	
//     return (array[0] + ":" + array[1]);

// }


// function checkTime(time)
// {	
// 	var array = time.split(":");
	
	
// 	if(( isNaN(array[0]) ) || ( isNaN(array[1]) ) )
// 	{			
// 		return false;
// 	}
	
// 	array[0] = parseInt(array[0]);
// 	array[1] = parseInt(array[1]);
	
	
// 	return ((array[0] >= 0 && array[0] <= 23) && (array[1] >= 0 && array[1] <= 59)) ? true : false;	
// }
// function displayUpdate()
// {
// 	$("#add-panel").slideDown();

// 	$("#submit-btn").css("display", "none");
// 	$("#update-btn").css("display", "initial");

// 	$("#add-title").html("Update Train");

// 	$("#name").val(firebaseDataObject[updateKey].name);	 		
// 	$("#destination").val(firebaseDataObject[updateKey].destination);
// 	$("#time").val(moment(firebaseDataObject[updateKey].firstTrainTime).format("HH:mm"));
// 	$("#frequency").val(firebaseDataObject[updateKey].frequency);	

// }
// function updateDone()
// {
	
// 	$("#name").val("");	 		
// 	$("#destination").val("");
// 	$("#time").val("");
// 	$("#frequency").val("");

// 	$("#add-panel").slideUp();

// 	$("#add-title").html("Add Train");	

// 	$("#submit-btn").css("display", "initial");
// 	$("#update-btn").css("display", "none");	

// }
// function updateTrain()
// {	
	
// 	if(getInputValues())
//  	{
 		
// 	 	var firstTrainTime = firstTimeString(time);

	 	
// 	 	var newTrain = new Train(name, destination, firstTrainTime, frequency);
	 		
	 	
// 	 	database.ref("/" + updateKey ).update(newTrain);

// 	 	updateDone();		
//  	}

// }
// function getInputValues()
// {

// 	name = $("#name").val().trim();
//  	destination = $("#destination").val().trim();
//  	time = $("#time").val().trim().replace(/\s/g,""); 
//  	frequency = parseInt($("#frequency").val().trim()); 

//  	if(name === "")
//  	{
//  		alert("Please Enter A Train Name");
//  		$("#name").val("").focus();
//  		return false;

//  	}
 
//  	else if(destination === "")
//  	{
//  		alert("Please Enter A Destination");
//  		$("#destination").val("").focus();
//  		return false;
//  	}
 	
//  	else if(!checkTime(time))
//  	{
//  		alert("Please Enter A Valid First Train Time! (HH:MM)");
//  		$("#time").val("").focus();
//  		return false;
//  	}
 
//  	else if(isNaN(frequency))
//  	{
//  		alert("Please Enter A Frequency");
//  		$("#frequency").val("").focus();
//  		return false;
//  	}	
//  	else
//  	{
 	
//  		time = pad(time);

// 	 	$("#name").val("");
// 	 	$("#destination").val("");
// 	 	$("#time").val("");   
// 	 	$("#frequency").val("");

// 	 	return true;
	 		
//  	}

// }

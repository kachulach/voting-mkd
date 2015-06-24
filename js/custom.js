var unitSelected;
var placeSelected;
var locationSelected;
var irregularitySelected;

var latitude = "";
var longitude = "";

function prepareForm(){

	var unitSelected = false;
	var placeSelected = false;
	var locationSelected = false;
	var irregularitySelected = false;

	$("#votingUnitSelect").select2();
	$("#votingPlaceSelect").select2();
	$("#votingLocationSelect").select2();
	$("#irregularityTypeSelect").select2();	
	
	fillVoitingUnitSelect();
	fillIrregularityTypeSelect();
	
	$("#votingPlaceSelect").select2("enable", false);
	$("#votingLocationSelect").select2("enable", false);
	
	$("#submit").prop("disabled", true);	
}

function fillVotingPlaceSelect(votingUnit){
	
	var request = $.ajax({
		url: 'http://voting.zor-komerc.mk/votingPlaceMarta.php?votingUnit='+votingUnit , 
		dataType:'jsonp'
	})
	 
	request.done(function( json ) {
	
	$('#votingPlaceSelect').empty();
	$('#votingPlaceSelect').select2('data', null);
	$('#votingLocationSelect').select2('data', null);	
	
	for (var key in json) {
	  if (json.hasOwnProperty(key)) {
		createOptionInSelect(json[key], json[key], "#votingPlaceSelect");		
	  }
	}
	
	$("#votingPlaceSelect").select2("enable", true);

	});
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});

}

function fillVoitingUnitSelect(){

	for(var i=1; i<=6; i++){
		createOptionInSelect(i, i, "#votingUnitSelect");
	}

}

function fillIrregularityTypeSelect(){

	var request = $.ajax({
		url: 'http://voting.zor-komerc.mk/votingIrregularityTypesMarta.php', 
		dataType:'jsonp'
	})
	 
	request.done(function( json ) {

	for (var key in json) {
	  if (json.hasOwnProperty(key)) {
		createOptionInSelect(key, json[key], "#irregularityTypeSelect");
	  }
	}

	});
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});

}

function fillVotingLocationSelect(votingUnit, votingPlace){

	var queryStr = "votingUnit="+votingUnit+"&votingPlace="+votingPlace;
	console.log(queryStr);

	var request = $.ajax({
		url: 'http://voting.zor-komerc.mk/votingLocationMarta.php?'+queryStr, 
		dataType:'jsonp'
	})
	 
	request.done(function( json ) {
	
	$('#votingLocationSelect').empty();	
	$('#votingLocationSelect').select2('data', null);
	
	for (var key in json) {
	  if (json.hasOwnProperty(key)) {
		createOptionInSelect(key, json[key], "#votingLocationSelect");		
	  }
	}
	
	$("#votingLocationSelect").select2("enable", true);

	});
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});

}

function createOptionInSelect(value, text, selectID){
	$('<option>').val(value).text(text).appendTo(selectID);
}

function clearAllSelection(){

	
	$('#votingUnitSelect').select2('data', null);	
	$('#votingPlaceSelect').select2('data', null);
	$('#votingLocationSelect').select2('data', null);	
	$('#irregularityTypeSelect').select2('data', null);


}

function checkSelectionOfAll(){

	if(unitSelected && placeSelected && locationSelected && irregularitySelected){		
		document.getElementById("submit").disabled=false;
	}
	else document.getElementById("submit").disabled=true;


}

function insertIrregularity(){

//todo
var location = $("#votingLocationSelect").select2("val");
var irregularity = $("#irregularityTypeSelect").select2("val");

	var request = $.ajax({
		url: 'http://voting.zor-komerc.mk/insertIrregularityMarta.php', 
		dataType:'jsonp'
	})
	 
	request.done(function( json ) {

		alert("done");

	});
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});
  
  

}

function getLongAndLat(votingPlace){

	var request = $.ajax({
		url: 'http://voting.zor-komerc.mk/votingLocationLogLat.php?votingPlace='+votingPlace , 
		dataType:'jsonp'
	})
	 
	request.success(function( json ) {	
		$('#hiddenLong').val( json["long"] );
		$('#hiddenLat').val( json["lat"] );	
		$('#hiddenLong').click();

	});
	 
	request.fail(function( jqXHR, textStatus ) {
	  alert( "Request failed: " + textStatus );
	});

	return request;
	
}

function handleData(data){
	console.log(data["long"]);
	$( '#hiddenLong' ).val( data["long"] );
	$( '#hiddenLat' ).val( data["lat"] );	
}

function submitform()
{  
  document.forms["irregularityForm"].submit();
  alert("form submitted");
}

$( document ).ready(function() {
	
	prepareForm();
	
	// voting unit selected
	$("#votingUnitSelect").on("select2-selecting", 
		function(e) { 
			console.log ("selecting val="+ e.val);
			unitSelected = true;			
			placeSelected = false;
			locationSelected = false;
			fillVotingPlaceSelect(e.val);			
			$("#votingLocationSelect").select2("enable", false);
			checkSelectionOfAll();
		})
		
	// voting place
	$("#votingPlaceSelect").on("select2-selecting", 
		function(e) { 
			console.log ("selecting val="+ e.val);
			placeSelected = true;
			locationSelected = false;
			fillVotingLocationSelect($("#votingUnitSelect").select2("val"),e.val);
			checkSelectionOfAll();
		})
	
	$("#votingLocationSelect").on("select2-selecting", 
		function(e) { 
			locationSelected = true;
			getLongAndLat($("#votingLocationSelect").select2("val")).done(handleData);	
			checkSelectionOfAll();
		})
		
	$("#irregularityTypeSelect").on("select2-selecting", 
		function(e) { 
			irregularitySelected = true;
			checkSelectionOfAll();
		})
		
	
});


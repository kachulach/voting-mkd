<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('content-type: application/json; charset=utf-8');

include('connection.php');

/* change character set to utf8 */
if (!$connection->set_charset("utf8")) {
    //printf("Error loading character set utf8: %s\n", $connection->error);
} else {
    //printf("Current character set: %s\n", $connection->character_set_name());
}

$myArray = array();
$irregularityTypeId = "";
if(isset($_GET["irregularityTypeId"]) && !empty($_GET["irregularityTypeId"])){
	$irregularityTypeId = $_GET["irregularityTypeId"];
	if ($result = $connection->query("
	
	SELECT vp.place, vp.longitude as longitude, vp.latitude as latitude, it.id as irregularityTypeId, vp.id as votingPlaceId, it.description, count(*) as vkupno FROM `incident` i, `votingPlace` vp, `irregularityType` it WHERE i.votingPlaceId = vp.id and i.irregularityTypeId=".$irregularityTypeId." and i.irregularityTypeId = it.id group by vp.id")) {
		$tempArray = array();
		while($row = $result->fetch_object()) {
			$tempArray = $row;
			array_push($myArray, $tempArray);
		}
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
}
else{
	if ($result = $connection->query("SELECT vp.place, vp.longitude as longitude, vp.latitude as latitude, it.id as irregularityTypeId, vp.id as votingPlaceId, it.description, count(*) as vkupno FROM `incident` i, `votingPlace` vp, `irregularityType` it WHERE i.votingPlaceId = vp.id and i.irregularityTypeId = it.id group by vp.id")) {
		$tempArray = array();
		while($row = $result->fetch_object()) {
			$tempArray = $row;
			array_push($myArray, $tempArray);
		}
		echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
	}
}

$result->close();
$connection->close();

?>
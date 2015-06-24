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

$irregularityTypeId = "";
$votingPlaceId = "";
$description = "";

if(isset($_POST["irregularityTypeId"]) && !empty($_POST["irregularityTypeId"]) && isset($_POST["votingPlaceId"]) && !empty($_POST["votingPlaceId"]) && isset($_POST["description"]) && !empty($_POST["description"])){
	$irregularityTypeId = $_POST["irregularityTypeId"];
	$votingPlaceId = $_POST["votingPlaceId"];
	$description = $_POST["description"];
	$query = "insert into incident(irregularityTypeId, votingPlaceId, description) values (".$irregularityTypeId.", ".$votingPlaceId.", \"".$description."\")";
	if ($connection->query($query) === TRUE) {
		$array["status"] = "OK";
		echo json_encode($array, JSON_UNESCAPED_UNICODE);
	} else {
		$array["status"] = "FAILED";
		echo json_encode($array, JSON_UNESCAPED_UNICODE);
	}
}

$connection->close();
?>










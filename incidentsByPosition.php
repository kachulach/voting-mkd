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

if ($result = $connection->query("select vp.id, vp.longitude, vp.latitude, count(*) as vkupno from votingPlace vp, incident i where vp.id = i.votingPlaceId group by vp.id")) {
	$tempArray = array();
	while($row = $result->fetch_object()) {
		$tempArray = $row;
		array_push($myArray, $tempArray);
	}
	echo json_encode($myArray, JSON_UNESCAPED_UNICODE);
}

$result->close();
$connection->close();

?>
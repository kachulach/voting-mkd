<?php

//header('content-type: application/json; charset=utf-8');

include 'connection.php';

mysqli_query($connection, "SET NAMES UTF8");

$location = $_GET["votingLocationSelect"];
$irregularityId = $_GET["irregularityTypeSelect"];
$description = $_GET["description"];

if(isset($location) && isset($irregularityId)){
	
$sql = "INSERT INTO incident (votingPlaceId, irregularityTypeId, description)
VALUES ('".$location."', '".$irregularityId."', '".$description."')";

if ($connection->query($sql) === TRUE) {
    die("<script>location.href = 'http://localhost:8080/votingv/index.html'</script>");
} else {
    echo "Error: " . $sql . "<br>" . $connection->error;
}

//redirect to page that sent the request
	
	
}

mysqli_close($connection);

?>
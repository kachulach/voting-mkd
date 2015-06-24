<?php

header('content-type: application/json; charset=utf-8');

include "connection.php";

mysqli_query($connection, "SET NAMES UTF8");

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$votingPlaceId = $_GET["votingPlace"];

if(isset($votingPlaceId)){

	$sql = "SELECT * FROM votingPlace WHERE id=" . $votingPlaceId;
	$result = $connection->query($sql);
	$array = array(); 


	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {		
			$array["long"] = $row["longitude"];
			$array["lat"] = $row["latitude"];
		}
		echo $_GET['callback'] . '('.json_encode($array).')';
		
	} else {
		echo "0 results";
	}
	
}



mysqli_close($connection);

?>
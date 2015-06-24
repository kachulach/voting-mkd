<?php

//header('content-type: application/json; charset=utf-8');

include "connection.php";

mysqli_query($connection, "SET NAMES UTF8");

$votingUnit = $_GET["votingUnit"];
$arrayPlace = array();

if(isset($votingUnit)){

	$sql = "SELECT * FROM votingPlace WHERE votingUnit=" . $votingUnit;
	$result = $connection->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$id = $row["id"];
			$place = $row["place"];	
			$arrayPlace[$id] = trim($place);
		}
		
		
		echo $_GET['callback'] . '('.json_encode(array_unique($arrayPlace)).')';
		
	} else {
		echo "0 results";
	}

}



?>
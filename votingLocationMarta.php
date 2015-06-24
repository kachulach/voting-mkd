<?php

//header('content-type: application/json; charset=utf-8');

include 'connection.php';

mysqli_query($connection, "SET NAMES UTF8");

$votingUnit = $_GET["votingUnit"];
$votingPlace = $_GET["votingPlace"];
$array = array();

if(isset($votingUnit) && isset($votingPlace)){

	$sql = "SELECT * FROM votingPlace WHERE votingUnit=" . $votingUnit;	
	$result = $connection->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$id = $row["id"];
			$location = str_replace("\"\"", "\"", $row["location"], $count);
			$location = str_replace("”", "\"", $location, $count);
			if($row["place"]==$votingPlace){
				$array[$id] = trim($location);
			}
		}		
		
		echo $_GET['callback'] . '('.json_encode(array_unique($array)).')';		
		
	} else {
		echo "0 results";
	}

}



?>
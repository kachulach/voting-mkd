<?php

//header('content-type: application/json; charset=utf-8');

include 'connection.php';

mysqli_query($connection, "SET NAMES UTF8");

$sql = "SELECT * FROM irregularityType";
$result = $connection->query($sql);
$array = array(); 


if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
		$id = $row["id"];
		$desc = $row["description"];
		$array[$id] = $desc;
    }
	echo $_GET['callback'] . '('.json_encode($array).')';
	
} else {
    echo "0 results";
}

mysqli_close($connection);

?>
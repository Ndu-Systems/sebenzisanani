<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));
$rows = array();
if (isset($data->email) ){
$email = $data->email;
$sql = "SELECT * FROM candidate WHERE email = '$email'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		$rows["candidate"][]= $row;
	}
}

echo json_encode($rows);
	$conn->close();
 }
	
 else {

	echo json_encode(500);
}

?>


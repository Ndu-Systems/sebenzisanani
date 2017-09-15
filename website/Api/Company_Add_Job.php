<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->description) ){
	
$catergorty   = $data->catergorty; 
$description  = $data->description;  
$expirience   = $data->expirience; 
$comment      = $data->comment;
$componeyId   = $data->componeyId; 
$positions    = $data->positions;
$location    = $data->location;
$componeyName    = $data->componeyName;


$status		= "Open";


        $sql = "INSERT INTO job VALUES(null , '$catergorty', '$description', $expirience, '$comment', $componeyId, $positions,'$status','$location', '$componeyName')";
        
        
        if ($conn->query($sql) === TRUE) {
            echo 1;
        } else {
            //echo json_encode('failed');
            echo "Error: " . $sql . "<br>" . $conn->error;
        }        
        
    }
	

 else {

	echo json_encode( "500");
}
?>

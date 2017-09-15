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
$positions    = $data->positions;
$location    = $data->location;
$componeyName    = $data->componeyName;
$id			= $data->id;
$status			= $data->status;

        $sql = "UPDATE job SET catergorty='$catergorty', description='$description',expirience= $expirience, comment='$comment',positions= $positions, status='$status', location='$location',componeyName= '$componeyName' WHERE id=$id";
        
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

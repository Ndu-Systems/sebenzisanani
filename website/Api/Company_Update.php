<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) ){
	
$name			= $data->name;
$contactperson  = $data->contactperson;
$tel            = $data->tel;
$email          = $data->email;
$province        = $data->province;
$city           = $data->city;
$surbub         = $data->surbub;
$address        = $data->address;
$id			= $data->id;

        $sql = "UPDATE company SET name='$name', contactperson='$contactperson',email= '$email', tel='$tel',province= '$province', city='$city', surbub='$surbub',address= '$address' WHERE id=$id";
        
        
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

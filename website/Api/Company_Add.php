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
$password       = $data->password;
$status = "New";

 if ($conn->query("SELECT * FROM company WHERE email = '$email'")->num_rows == 0) {
        $sql = "INSERT INTO company VALUES(null , '$name', '$contactperson', '$email', '$tel', '$province', '$city', '$surbub', '$address', '$status', '$password')";
        
        
        if ($conn->query($sql) === TRUE) {
            echo 1;
        } else {
            //echo json_encode('failed');
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
        
    }
	else{
		echo "Email address already used choose a different one or go to Login";
	}
}
 else {

	echo json_encode( "500");
}
?>

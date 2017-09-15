<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) ){
	
$name               = $data->name;
$surname            = $data->surname;
$cell               = $data->cell;
$email              = $data->email;
$password           = $data->password;
$identity           = $data->identity;
$title              = $data->title;
$jobCatergory       = $data->jobCatergory;
$jobTitle           = $data->jobTitle;
$jobDescription     = $data->jobDescription;
$expirience         = $data->expirience;
$cv                 = $data->cv;
$city               = $data->city;


 if ($conn->query("SELECT * FROM candidate WHERE email = '$email'")->num_rows == 0) {
        $sql = "INSERT INTO candidate VALUES(null , '$name', '$surname', '$email', '$cell', '$identity', '$title', '$jobCatergory', '$jobTitle', '$jobDescription', 
        '$expirience','$cv','$city','$password')";
        
        
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

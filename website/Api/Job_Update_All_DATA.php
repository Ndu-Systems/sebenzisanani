<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) ){
	
 $name               = $data->name;
   $surname            = $data->surname;
   $email              = $data->email;
   $cell               = $data->cell;
   $identity           = $data->identity;
   $title              = $data->title;
   $jobCatergory       = $data->jobCatergory;
   $jobTitle           = $data->jobTitle;
   $jobDescription     = $data->jobDescription;
   $expirience         = $data->expirience;
   $cv                 = $data->cv;
   $city 				= $data->city;
$id			= $data->id;

        $sql = "UPDATE candidate 
		SET name='$name', email='$email',cell= $cell, identity='$identity',title= '$title', 
		jobCatergory='$jobCatergory', jobTitle='$jobTitle',jobDescription= '$jobDescription'
		, expirience = '$expirience', cv='$cv' , city='$city' WHERE id=$id";
        
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

<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) ){
	
  $name  = $data->name;
  $email = $data->email; 
  $cell  = $data->cell;
  $type  = $data->type;
  $status= "New";
$date = date("l jS \of F Y h:i:s A");

        $sql = "INSERT INTO Contacts VALUES(null , '$name', '$email', '$cell', '$type', '$status', '$date')";
        
        
        if ($conn->query($sql) === TRUE) {
            echo "Thanks for leaving your contact details we will contact you as soon as possible";
        } else {
            //echo json_encode('failed');
            echo "Error: " . $sql . "<br>" . $conn->error;
        }        
        
   
}
 else {

	echo json_encode( "500");
}
?>

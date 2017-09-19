<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->jobId) ){
	
$jobId               = $data->jobId;
$candidateId            = $data->candidateId;
$status               = $data->status;
$date = date("l jS \of F Y h:i:s A");

 if ($conn->query("SELECT * FROM listing WHERE candidateId = $candidateId AND jobId = $jobId ")->num_rows == 0) {
        $sql = "INSERT INTO listing VALUES(null , $candidateId, $jobId, '$date', '$status')";
        
        
        if ($conn->query($sql) === TRUE) {
            echo "You Application was sent, We will contact you as soon as possible";
        } else {
            //echo json_encode('failed');
            echo "Error: " . $sql . "<br>" . $conn->error;
        }        
        
    }
	else{
		echo "You already Applyed for this job, we will contact you soon";
	}
}
 else {

	echo json_encode( "500");
}
?>

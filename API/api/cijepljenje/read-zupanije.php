<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/zupanije.php';


  $database = new Database();
  $db = $database->connect();

  $oZupanije = new Zupanija($db);

  try{
   $result = $oZupanije->read();
   $num = $result->rowCount();

   //if($num >0){
    $zupanije_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $zupanije_item = array(
      'id' => $id,
      'naziv_zupanije' => $naziv_zupanije
     );
     array_push($zupanije_arr, $zupanije_item);
    }
    echo json_encode($zupanije_arr);
   //}else{
    //echo json_encode(array(
     //'message' => 'Cijepljeni nisu pronađeni'
    //));
   //}
  }catch(Exception $e){
   echo json_encode(array('try_err'=> $e.getMessage()));
  };
  
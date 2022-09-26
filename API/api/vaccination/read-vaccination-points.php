<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/vaccination-points.php';


  $database = new Database();
  $db = $database->connect();

  $oPunktovi = new Punkt($db);

  try{
   $result = $oPunktovi->read();
    $punktovi_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $punktovi_item = array(
      'id' => $id,
      'naziv_punkta' => $naziv_punkta
     );
     array_push($punktovi_arr, $punktovi_item);
    }
    echo json_encode($punktovi_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja podataka.",
     "error" => $e->getMessage()
    ));
   };
  
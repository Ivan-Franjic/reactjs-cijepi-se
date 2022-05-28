<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/cjepiva.php';


  $database = new Database();
  $db = $database->connect();

  $oCjepiva = new Cjepivo($db);

  try{
   $result = $oCjepiva->read();
    $cjepiva_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $cjepiva_item = array(
      'ID' => $ID,
      'naziv_cjepiva' => $naziv_cjepiva
     );
     array_push($cjepiva_arr, $cjepiva_item);
    }
    echo json_encode($cjepiva_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja cjepiva.",
     "error" => $e->getMessage()
    ));
   };
  
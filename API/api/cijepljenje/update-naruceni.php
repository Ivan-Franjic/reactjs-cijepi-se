<?php 
   // Headers
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: PUT');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
   
   include_once '../../includes/connection.php';
   include_once '../../models/cijepljenje.php';

 $database = new Database();
 $db = $database->connect();

 $oNarucen = new Pacijent($db);

 $data = json_decode(file_get_contents("php://input"));
 
 $oNarucen->OIB = $data->OIB;
 $oNarucen->prva_doza_datum = $data->prva_doza_datum;
 $oNarucen->prva_doza_status = $data->prva_doza_status;
 $oNarucen->druga_doza_datum = $data->druga_doza_datum;
 $oNarucen->druga_doza_status = $data->druga_doza_status;

 if($oNarucen->update_naruceni()){
  echo json_encode(array('message' => 'Pregled uspješno ažuriran'));
 }else{
  echo json_encode(array('message' => 'Pregled neuspješno ažuriran'));
 }
?>
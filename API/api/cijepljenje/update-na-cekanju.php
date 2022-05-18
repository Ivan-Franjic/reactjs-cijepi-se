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

 $oPacijent = new Pacijent($db);

 $data = json_decode(file_get_contents("php://input"));
 
 $oPacijent->OIB = $data->OIB;
 $oPacijent->vrsta_cjepiva = $data->vrsta_cjepiva;
 $oPacijent->prva_doza_datum = $data->prva_doza_datum;
 $oPacijent->prva_doza_status = $data->prva_doza_status;
 $oPacijent->druga_doza_datum = $data->druga_doza_datum;
 $oPacijent->druga_doza_status = $data->druga_doza_status;

 if($oPacijent->update_na_cekanju()){
  echo json_encode(array('message' => 'Pacijent uspješno ažuriran!'));
 }else{
  echo json_encode(array('message' => 'Pacijent neuspješno ažuriran!'));
 }
?>
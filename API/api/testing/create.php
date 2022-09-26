<?php 
 header('Access-Control-Allow-Origin: *');
 header('Content-Type: application/json');
 header('Access-Control-Allow-Methods: POST');
 header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Access-Control-Max-Age, Authorization, X-Requested-With');

 include_once '../../includes/connection.php';
 include_once '../../models/testing.php';

 $database = new Database();
 $db = $database->connect();

 $oTest = new Testiranje($db);

 $data = json_decode(file_get_contents("php://input"));
 
 $oTest->oib = $data->oib;
 $oTest->test = $data->test;
 $oTest->datum = $data->datum;
 $oTest->rezultat = $data->rezultat;

 try{
  $oTest->create();
  echo json_encode(array('message' => 'Test uspješno naručen'));
 }catch(Exception $e){
  echo json_encode(array(
   'message' => 'Došlo je do pogreške kod naručivanja na testiranje.',
   'error' => $e.getMessage()
 ));
 }
 
?>
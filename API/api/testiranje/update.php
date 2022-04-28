<?php 
   // Headers
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: PUT');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
   
   include_once '../../includes/connection.php';
   include_once '../../models/testiranje.php';

 $database = new Database();
 $db = $database->connect();

 $oTest = new Testiranje($db);

 $data = json_decode(file_get_contents("php://input"));

 $oTest->id = $data->id;
 //$oTest->ime = $data->ime;
 //$oTest->prezime = $data->prezime;
 //$oTest->adresa = $data->adresa;
 //$oTest->grad = $data->grad;
 //$oTest->zupanija = $data->zupanija;
 $oTest->OIB = $data->OIB;
 //$oTest->datum_rodenja = $data->datum_rodenja;
 $oTest->test = $data->test;
 $oTest->datum = $data->datum;
 $oTest->rezultat = $data->rezultat;
 $oTest->token = $data->token;

 if($oTest->update()){
  echo json_encode(array('message' => 'Pregled uspješno ažuriran'));
 }else{
  echo json_encode(array('message' => 'Pregled neuspješno ažuriran'));
 }
?>
<?php 
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: PUT');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
   
   include_once '../includes/connection.php';
   include_once '../models/profile.php';

 $database = new Database();
 $db = $database->connect();

 $oProfil = new Profil($db);

 $data = json_decode(file_get_contents("php://input"));
 
 $oProfil->oib = $data->oib;
 $oProfil->ime = $data->ime;
 $oProfil->prezime = $data->prezime;
 $oProfil->adresa = $data->adresa;
 $oProfil->grad = $data->grad;
 $oProfil->zupanija = $data->zupanija;
 $oProfil->datum_rodenja = $data->datum_rodenja;
 $oProfil->punkt_cijepljenja = $data->punkt_cijepljenja;

 if($oProfil->update_profile()){
  echo json_encode(array('message' => 'Pacijent uspješno ažuriran!'));
 }else{
  echo json_encode(array('message' => 'Pacijent neuspješno ažuriran!'));
 }
?>
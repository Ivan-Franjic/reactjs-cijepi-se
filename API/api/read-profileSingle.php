<?php
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: access");
   header("Content-Type: application/json; charset=UTF-8");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   
   include_once '../includes/connection.php';
   include_once '../models/profile.php';

 $database = new Database();
 $db = $database->connect();

 $oProfile = new Profil($db);

 $oProfile->oib = isset($_GET['oib']) ? $_GET['oib'] : die();
 try{
    $oProfile->read_profileSingle();
    $datumint=$oProfile->datum_rodenja;
    $datumstring=strval($datumint);
    $mjesec=substr($datumstring, 4, 2);
    $godina=substr($datumstring, 0, 4);
    $dan=substr($datumstring, 6, 2);

   $datumprikaz=$godina.'-'.$mjesec.'-'.$dan;

   $profile_arr = array(
      'oib' => $oProfile->oib,
      'ime' => $oProfile->ime,
      'prezime' => $oProfile->prezime,
      'adresa' => $oProfile->adresa,
      'grad' => $oProfile->grad,
      'zupanija' => $oProfile->zupanija,
      'datum_rodenja' => $datumprikaz,
      'punkt_cijepljenja' => $oProfile->punkt_cijepljenja,
   );
   echo json_encode($profile_arr);
 }catch(Exception $e){
  echo json_encode(array(
   "message" => "Došlo je do pogreške kod učitavanja podataka o pacijentu.",
   "error" => $e->getMessage()
  ));
 };
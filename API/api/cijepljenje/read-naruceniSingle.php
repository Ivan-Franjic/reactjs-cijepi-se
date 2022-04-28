<?php
   // Headers
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: access");
   header("Content-Type: application/json; charset=UTF-8");
   header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
   
   include_once '../../includes/connection.php';
   include_once '../../models/cijepljenje.php';

 $database = new Database();
 $db = $database->connect();

 $oNarucen = new Pacijent($db);

 $oNarucen->OIB = isset($_GET['OIB']) ? $_GET['OIB'] : die();
 try{
    $oNarucen->read_naruceniSingle();
    $datumint=$oNarucen->prva_doza_datum;
    $datumint2=$oNarucen->druga_doza_datum;
    $datumstring=strval($datumint);
    $mjesec=substr($datumstring, 4, 2);
    $godina=substr($datumstring, 0, 4);
    $dan=substr($datumstring, 6, 2);
    $datumstring2=strval($datumint2);
    $mjesec2=substr($datumstring2, 4, 2);
    $godina2=substr($datumstring2, 0, 4);
    $dan2=substr($datumstring2, 6, 2);
    
    $datumprikaz=$godina.'-'.$mjesec.'-'.$dan;
    $datumprikaz2=$godina2.'-'.$mjesec2.'-'.$dan2;

   $narucen_arr = array(
      'ime' => $oNarucen->ime,
      'prezime' => $oNarucen->prezime,
      'adresa' => $oNarucen->adresa,
      'grad' => $oNarucen->grad,
      'zupanija' => $oNarucen->zupanija,
      'OIB' => $oNarucen->OIB,
      'datum_rodenja' => $oNarucen->datum_rodenja,
      'token' => $oNarucen->token,
      'vrsta_cjepiva' => $oNarucen->vrsta_cjepiva,
      'prva_doza_datum' => $datumprikaz,
      'prva_doza_status' => $oNarucen->prva_doza_status,
      'druga_doza_datum' => $datumprikaz2,
      'druga_doza_status' => $oNarucen->druga_doza_status,
   );
   echo json_encode($narucen_arr);
 }catch(Exception $e){
  echo json_encode(array(
   "message" => "Došlo je do pogreške kod učitavanja podataka o pregledu.",
   "error" => $e->getMessage()
  ));
 };
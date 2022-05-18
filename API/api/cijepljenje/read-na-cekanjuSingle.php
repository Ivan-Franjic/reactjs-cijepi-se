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

 $oNa_cekanju = new Pacijent($db);

 $oNa_cekanju->OIB = isset($_GET['OIB']) ? $_GET['OIB'] : die();
 try{
    $oNa_cekanju->read_na_cekanjuSingle();
   $na_cekanju_arr = array(
      'ime' => $oNa_cekanju->ime,
      'prezime' => $oNa_cekanju->prezime,
      'adresa' => $oNa_cekanju->adresa,
      'grad' => $oNa_cekanju->grad,
      'zupanija' => $oNa_cekanju->zupanija,
      'OIB' => $oNa_cekanju->OIB,
      'datum_rodenja' => $oNa_cekanju->datum_rodenja,
      'vrsta_cjepiva' => $oNa_cekanju->vrsta_cjepiva,
      'prva_doza_datum' => $oNa_cekanju->prva_doza_datum,
      'prva_doza_status' => $oNa_cekanju->prva_doza_status,
      'druga_doza_datum' => $oNa_cekanju->druga_doza_datum,
      'druga_doza_status' => $oNa_cekanju->druga_doza_status,
   );
   echo json_encode($na_cekanju_arr);
 }catch(Exception $e){
  echo json_encode(array(
   "message" => "Došlo je do pogreške kod učitavanja podataka o pacijentu.",
   "error" => $e->getMessage()
  ));
 };
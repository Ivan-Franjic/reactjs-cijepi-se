<?php 
  // Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/testiranje.php';


  $database = new Database();
  $db = $database->connect();

  $oTestovi = new Testiranje($db);

  try{
    $result = $oTestovi->read_testovi();
   $testovi_arr = array();
   while($row = $result->fetch(PDO::FETCH_ASSOC)){
    extract($row);
   $datum_baza_1=$datum;
   $datumstring=strval($datum_baza_1);
	 $dan_1=substr($datumstring, -2);
	 $mjesec_1=substr($datumstring, -4, 2);
	 $godina_1=substr($datumstring, 0, -4);
	 $datum_prikaz_1=$dan_1.".".$mjesec_1.".".$godina_1.".";

     $testovi_item = array(
      'OIB' => $OIB,
      'test' => $test,
      'datum' => $datum_prikaz_1,
      'rezultat' => $rezultat
    );
    array_push($testovi_arr, $testovi_item);
  }
     
     echo json_encode($testovi_arr);
    }catch(Exception $e){
     echo json_encode(array(
      "message" => "Došlo je do pogreške kod učitavanja podataka o testu.",
      "error" => $e->getMessage()
     ));
    };
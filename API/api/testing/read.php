<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/testing.php';


  $database = new Database();
  $db = $database->connect();

  $oTestiranje = new Testiranje($db);

  try{
   $result = $oTestiranje->read();
   $testiran_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
     $dan_rodenje=substr($datum_baza_rodenje, -2);
	 $mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
	 $godina_rodenje=substr($datum_baza_rodenje, 0, -4);
	 $datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";

     $datum_baza_1=$datum;
	 $dan_1=substr($datum_baza_1, -2);
	 $mjesec_1=substr($datum_baza_1, -4, 2);
	 $godina_1=substr($datum_baza_1, 0, -4);
	 $datum_prikaz_1=$dan_1.".".$mjesec_1.".".$godina_1.".";

       $testiran_item = array(
      'id' => $id,
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'oib' => $oib,
      'datum_rodenja' => $datum_prikaz_rodenje,
      'test' => $test,
      'datum' => $datum_prikaz_1,
      'rezultat' => $rezultat
     );
     array_push($testiran_arr, $testiran_item);
    }
    echo json_encode($testiran_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja testova.",
     "error" => $e->getMessage()
    ));
   };
  
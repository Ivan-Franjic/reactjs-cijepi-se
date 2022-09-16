<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/testing.php';


  $database = new Database();
  $db = $database->connect();

  $oTestiranje_povijest = new Testiranje($db);

  try{
   $result = $oTestiranje_povijest->read_history();
    $testiranp_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
     $dan_rodenje=substr($datum_baza_rodenje, -2);
	 $mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
	 $godina_rodenje=substr($datum_baza_rodenje, 0, -4);
	 $datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";

       $testiranp_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'oib' => $oib,
      'datum_rodenja' => $datum_prikaz_rodenje
     );
     array_push($testiranp_arr, $testiranp_item);
    }
    echo json_encode($testiranp_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja podataka.",
     "error" => $e->getMessage()
    ));
   };
  
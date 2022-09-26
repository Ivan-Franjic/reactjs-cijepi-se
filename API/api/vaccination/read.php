<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/vaccination.php';


  $database = new Database();
  $db = $database->connect();

  $oCijepljeni = new Pacijent($db);

  try{
   $result = $oCijepljeni->read();
    $cijepljen_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
     $dan_rodenje=substr($datum_baza_rodenje, -2);
		 $mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
		 $godina_rodenje=substr($datum_baza_rodenje, 0, -4);
		 $datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";

     $datum_baza_2=$druga_doza_datum;
			$dan_2=substr($datum_baza_2, -2);
			$mjesec_2=substr($datum_baza_2, -4, 2);
			$godina_2=substr($datum_baza_2, 0, -4);
			$datum_prikaz_2=$dan_2.".".$mjesec_2.".".$godina_2.".";

     $cijepljen_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'oib' => $oib,
      'datum_rodenja' => $datum_prikaz_rodenje,
      'punkt_cijepljenja' => $punkt_cijepljenja,
      'vrsta_cjepiva' => $vrsta_cjepiva,
      'naziv_cjepiva' => html_entity_decode($naziv_cjepiva),
      'prva_doza_datum' => $prva_doza_datum,
      'prva_doza_status' => $prva_doza_status,
      'druga_doza_datum' => $datum_prikaz_2,
      'druga_doza_status' => $druga_doza_status
     );
     array_push($cijepljen_arr, $cijepljen_item);
    }
    echo json_encode($cijepljen_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja podataka.",
     "error" => $e->getMessage()
    ));
   };
  
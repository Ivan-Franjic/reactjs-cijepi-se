<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../includes/connection.php';
include_once '../../models/cijepljenje.php';


  $database = new Database();
  $db = $database->connect();

  $oNa_cekanju = new Pacijent($db);

  try{
   $result = $oNa_cekanju->read_na_cekanju();

    $na_cekanju_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
				$dan_rodenje=substr($datum_baza_rodenje, -2);
				$mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
				$godina_rodenje=substr($datum_baza_rodenje, 0, -4);
				$datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";
        
     $na_cekanju_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'OIB' => $OIB,
      'datum_rodenja' => $datum_prikaz_rodenje
     );
     array_push($na_cekanju_arr, $na_cekanju_item);
    }
    echo json_encode($na_cekanju_arr);
  }catch(Exception $e){
    echo json_encode(array(
     "message" => "Došlo je do pogreške kod učitavanja podataka.",
     "error" => $e->getMessage()
    ));
   };
  
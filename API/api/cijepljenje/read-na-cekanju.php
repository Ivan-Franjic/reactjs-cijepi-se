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

  try{
   $result = $oNa_cekanju->read_na_cekanju();
   $num = $result->rowCount();

   //if($num >0){
    $na_cekanju_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
				$dan_rodenje=substr($datum_baza_rodenje, -2);
				$mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
				$godina_rodenje=substr($datum_baza_rodenje, 0, -4);
				$datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";
        $danasnji_datum=Date("Ymd");
        $datum_razlika=($danasnji_datum-$datum_baza_rodenje);
        $godina=substr($datum_razlika, 0, 2);
        $god = (int)$godina;
        
     $na_cekanju_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'OIB' => $OIB,
      'datum_rodenja' => $datum_prikaz_rodenje,
      'god' => $god
     );
     array_push($na_cekanju_arr, $na_cekanju_item);
    }
    echo json_encode($na_cekanju_arr);
   //}else{
    //echo json_encode(array(
     //'message' => 'Cijepljeni nisu pronađeni'
    //));
   //}
  }catch(Exception $e){
   echo json_encode(array('try_err'=> $e.getMessage()));
  };
  
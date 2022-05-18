<?php 
  // Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//require __DIR__ . '/includes/connection.php';
include_once '../../includes/connection.php';
include_once '../../models/cijepljenje.php';


  $database = new Database();
  $db = $database->connect();

  $oNaruceni = new Pacijent($db);

  try{
   $result = $oNaruceni->read_naruceni();
   $num = $result->rowCount();

   //if($num >0){
    $narucen_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_rodenje=$datum_rodenja;
				$dan_rodenje=substr($datum_baza_rodenje, -2);
				$mjesec_rodenje=substr($datum_baza_rodenje, -4, 2);
				$godina_rodenje=substr($datum_baza_rodenje, 0, -4);
				$datum_prikaz_rodenje=$dan_rodenje.".".$mjesec_rodenje.".".$godina_rodenje.".";

				$datum_baza_1=$prva_doza_datum;
				$dan_1=substr($datum_baza_1, -2);
				$mjesec_1=substr($datum_baza_1, -4, 2);
				$godina_1=substr($datum_baza_1, 0, -4);
				$datum_prikaz_1=$dan_1.".".$mjesec_1.".".$godina_1.".";

				$datum_baza_2=$druga_doza_datum;
				$dan_2=substr($datum_baza_2, -2);
				$mjesec_2=substr($datum_baza_2, -4, 2);
				$godina_2=substr($datum_baza_2, 0, -4);
				$datum_prikaz_2=$dan_2.".".$mjesec_2.".".$godina_2.".";
				$danasnji_datum=Date("Ymd");
        $datum_razlika=($danasnji_datum-$datum_baza_rodenje);
        $godina=substr($datum_razlika, 0, 2);
        $god = (int)$godina;
     $narucen_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'adresa' => $adresa,
      'grad' => $grad,
      'zupanija' => $zupanija,
      'OIB' => $OIB,
      'datum_rodenja' => $datum_prikaz_rodenje,
      'god' => $god,
      'vrsta_cjepiva' => $vrsta_cjepiva,
      'naziv_cjepiva' => html_entity_decode($naziv_cjepiva),
      'prva_doza_datum' => $datum_prikaz_1,
      'prva_doza_status' => $prva_doza_status,
      'druga_doza_datum' => $datum_prikaz_2,
      'druga_doza_status' => $druga_doza_status
     );
     array_push($narucen_arr, $narucen_item);
    }
    echo json_encode($narucen_arr);
   //}else{
    //echo json_encode(array(
     //'message' => 'Cijepljeni nisu pronađeni'
    //));
   //}
  }catch(Exception $e){
   echo json_encode(array('try_err'=> $e.getMessage()));
  };
  
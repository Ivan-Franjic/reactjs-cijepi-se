<?php 
  // Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//require __DIR__ . '/includes/connection.php';
include_once '../../includes/connection.php';
include_once '../../models/testiranje.php';


  $database = new Database();
  $db = $database->connect();

  $oTestovi = new Testiranje($db);

  try{
   $result = $oTestovi->read_testovi();
   $num = $result->rowCount();

   //if($num >0){
    $tests_arr = array();
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
     extract($row);
     $datum_baza_1=$datum;
	 $dan_1=substr($datum_baza_1, -2);
	 $mjesec_1=substr($datum_baza_1, -4, 2);
	 $godina_1=substr($datum_baza_1, 0, -4);
	 $datum_prikaz_1=$dan_1.".".$mjesec_1.".".$godina_1.".";

     $tests_item = array(
      'ime' => html_entity_decode($ime),
      'prezime' => html_entity_decode($prezime),
      'test' => $test,
      'datum' => $datum_prikaz_1,
      'rezultat' => $rezultat
     );
     array_push($tests_arr, $tests_item);
    }
    echo json_encode($tests_arr);
   //}else{
    //echo json_encode(array(
     //'message' => 'Cijepljeni nisu pronađeni'
    //));
   //}
  }catch(Exception $e){
   echo json_encode(array('try_err'=> $e.getMessage()));
  };
  
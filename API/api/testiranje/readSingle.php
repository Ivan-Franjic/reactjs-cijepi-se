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

 $oTest = new Testiranje($db);

 $oTest->id = isset($_GET['id']) ? $_GET['id'] : die();
 try{
    $oTest->readSingle();
    $datumint=$oTest->datum;
    $datumstring=strval($datumint);
    $mjesec=substr($datumstring, 4, 2);
    $godina=substr($datumstring, 0, 4);
    $dan=substr($datumstring, 6, 2);

    $datumprikaz=$godina.'-'.$mjesec.'-'.$dan;

    
  // if($oTest->OIB != null){
      $test_arr = array(
      'id' => $oTest->id,
      'OIB' => $oTest->OIB,
      //'ime' => $oTest->ime,
      //'prezime' => $oTest->prezime,
      //'adresa' => $oTest->adresa,
      //'grad' => $oTest->grad,
      //'zupanija' => $oTest->zupanija,
      //'datum_rodenja' => $oTest->datum_rodenja,
      'test' => $oTest->test,
      'datum' => $datumprikaz,
      'rezultat' => $oTest->rezultat,
      'token' => $oTest->token,
   );
   echo json_encode($test_arr);
   //}else{
    //  echo json_encode(array('message' => 'Test sa zatrazenim identifikatorom ne postoji.'));
  // }
 }catch(Exception $e){
  echo json_encode(array(
   "message" => "Došlo je do pogreške kod učitavanja podataka o testu.",
   "error" => $e->getMessage()
  ));
 };
?>
<?php 
 class Punkt{
  private $conn;
  private $table='punktovi';

  public $id;
  public $naziv_punkta;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){

    $query = "SELECT pu.id, pu.naziv_punkta FROM punktovi pu";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
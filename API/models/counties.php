<?php 
 class Zupanija{
  private $conn;
  private $table='zupanije';

  public $id;
  public $naziv_zupanije;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){

    $query = "SELECT z.id, z.naziv_zupanije FROM zupanije z";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
<?php 
 class Zupanija{
  private $conn;
  private $table='cijepi_se_zupanije';

  public $id;
  public $naziv_zupanije;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){

    $query = "SELECT z.id, z.naziv_zupanije FROM cijepi_se_zupanije z";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
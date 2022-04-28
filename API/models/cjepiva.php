<?php 
 class Cjepivo{
  private $conn;
  private $table='cijepi_se_cjepiva';

  public $ID;
  public $naziv_cjepiva;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){
    //query
 
    $query = "SELECT cj.ID, cj.naziv_cjepiva FROM cijepi_se_cjepiva cj";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
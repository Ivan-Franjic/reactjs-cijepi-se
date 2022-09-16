<?php 
 class Cjepivo{
  private $conn;
  private $table='cjepiva';

  public $id;
  public $naziv_cjepiva;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){

    $query = "SELECT cj.id, cj.naziv_cjepiva FROM cjepiva cj";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
<?php 
 class Testiranje{
  private $conn;
  private $table='cijepi_se_testiranje';

  public $id;
  public $ime;
  public $prezime;
  public $adresa;
  public $grad;
  public $zupanija;
  public $OIB;
  public $datum_rodenja;
  public $test;
  public $datum;
  public $rezultat;
  public $token;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){
    //query
 
    $query = "SELECT t.id, t.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, t.test, t.datum, t.rezultat, t.token FROM cijepi_se_testiranje t LEFT JOIN cijepi_se_korisnici k ON t.OIB = k.OIB WHERE t.rezultat='Na čekanju'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function readSingle(){
    //query
 
    $query = 'SELECT TOP 1 t.id, t.OIB, t.test, t.datum, t.rezultat, t.token FROM '. $this->table . ' t WHERE t.id = ?';
    

    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->id, PDO::PARAM_INT);

    $stmt->execute();
    
    //$row = $stmt->fetch(PDO::FETCH_ASSOC);
    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
    $this->OIB = $row['OIB'];
    //$this->ime = $row['ime']; 
    //$this->prezime = $row['prezime']; 
    //$this->adresa = $row['adresa'];
    //$this->grad = $row['grad'];
    //$this->zupanija = $row['zupanija'];
    //$this->datum_rodenja = $row['datum_rodenja'];
    $this->test = $row['test'];
    $this->datum = $row['datum'];
    $this->rezultat = $row['rezultat'];
    $this->token = $row['token'];

    }
   }

   public function update(){
    $query = 'UPDATE ' .$this->table.' SET test= :test, datum = :datum, rezultat = :rezultat WHERE id = :id';
    
    $stmt = $this->conn->prepare($query);

      $this->test = htmlspecialchars(strip_tags($this->test));
      $this->datum = htmlspecialchars(strip_tags($this->datum));
      $this->rezultat = htmlspecialchars(strip_tags($this->rezultat));
   
      $stmt->bindParam(':test', $this->test);
      $stmt->bindParam(':datum', $this->datum);
      $stmt->bindParam(':rezultat', $this->rezultat);
      $stmt->bindParam(':id', $this->id);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }

   public function read_povijest(){
    //query
 
    $query = "SELECT DISTINCT t.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja FROM cijepi_se_testiranje t LEFT JOIN cijepi_se_korisnici k ON t.OIB = k.OIB";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_testovi(){
    //query
 
    $query = "SELECT t.OIB, k.ime, k.prezime, t.test, t.datum, t.rezultat FROM cijepi_se_testiranje t LEFT JOIN cijepi_se_korisnici k ON t.OIB = k.OIB WHERE t.rezultat<>'Na čekanju'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   

   
  
 }
?>
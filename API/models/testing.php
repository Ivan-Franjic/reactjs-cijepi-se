<?php 
 class Testiranje{
  private $conn;
  private $table='testiranje';

  public $id;
  public $ime;
  public $prezime;
  public $adresa;
  public $grad;
  public $zupanija;
  public $oib;
  public $datum_rodenja;
  public $test;
  public $datum;
  public $rezultat;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read(){

    $query = "SELECT t.id, t.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, t.test, t.datum, t.rezultat FROM testiranje t LEFT JOIN pacijenti pac ON t.oib = pac.oib WHERE t.rezultat='Na čekanju'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function readSingle(){

    $query = 'SELECT t.id, t.oib, t.test, t.datum, t.rezultat FROM '. $this->table . ' t WHERE t.id = ? LIMIT 0,1;';
    

    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->id, PDO::PARAM_INT);

    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {
    $this->oib = $row['oib'];
    $this->test = $row['test'];
    $this->datum = $row['datum'];
    $this->rezultat = $row['rezultat'];

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

   public function read_history(){

    $query = "SELECT DISTINCT t.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja FROM testiranje t LEFT JOIN pacijenti pac ON t.oib = pac.oib";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_tests(){

    $query = "SELECT t.oib, t.test, t.datum, t.rezultat FROM testiranje t WHERE t.rezultat<>'Na čekanju'";
    
    $stmt = $this->conn->prepare($query);

    $stmt->execute();
 
    return $stmt;
   }

 }
?>
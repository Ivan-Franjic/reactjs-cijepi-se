<?php 
 class Pacijent{
  private $conn;
  private $table='cijepljenje';

  public $ime;
  public $prezime;
  public $adresa;
  public $grad;
  public $zupanija;
  public $oib;
  public $datum_rodenja;
  public $punkt_cijepljenja;
  public $naziv_cjepiva;
  public $vrsta_cjepiva;
  public $prva_doza_datum;
  public $prva_doza_status;
  public $druga_doza_datum;
  public $druga_doza_status;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read_on_hold(){
 
    $query = "SELECT cij.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, pac.punkt_cijepljenja FROM cijepljenje cij LEFT JOIN pacijenti pac ON cij.oib = pac.oib WHERE cij.vrsta_cjepiva IS NULL";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_on_holdSingle(){
 
    $query = 'SELECT cij.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status FROM '. $this->table . ' cij LEFT JOIN pacijenti pac ON cij.oib = pac.oib WHERE cij.oib = ? LIMIT 0,1;';
    
    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->oib, PDO::PARAM_STR);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->oib = $row['oib'];
    $this->ime = $row['ime']; 
    $this->prezime = $row['prezime']; 
    $this->adresa = $row['adresa'];
    $this->grad = $row['grad'];
    $this->zupanija = $row['zupanija'];
    $this->datum_rodenja = $row['datum_rodenja'];
    $this->vrsta_cjepiva = $row['vrsta_cjepiva'];
    $this->prva_doza_datum = $row['prva_doza_datum'];
    $this->prva_doza_status = $row['prva_doza_status'];
    $this->druga_doza_datum = $row['druga_doza_datum'];
    $this->druga_doza_status = $row['druga_doza_status'];

   }

   public function update_on_hold(){
    $query = 'UPDATE ' .$this->table.' SET  vrsta_cjepiva= :vrsta_cjepiva, prva_doza_datum = :prva_doza_datum, prva_doza_status = :prva_doza_status, druga_doza_datum = :druga_doza_datum, druga_doza_status = :druga_doza_status WHERE oib = :oib';
    
    $stmt = $this->conn->prepare($query);

      $this->vrsta_cjepiva = htmlspecialchars(strip_tags($this->vrsta_cjepiva));
      $this->prva_doza_datum = htmlspecialchars(strip_tags($this->prva_doza_datum));
      $this->prva_doza_status = htmlspecialchars(strip_tags($this->prva_doza_status));
      $this->druga_doza_datum = htmlspecialchars(strip_tags($this->druga_doza_datum));
      $this->druga_doza_status = htmlspecialchars(strip_tags($this->druga_doza_status));
   
      $stmt->bindParam(':vrsta_cjepiva', $this->vrsta_cjepiva);
      $stmt->bindParam(':prva_doza_datum', $this->prva_doza_datum);
      $stmt->bindParam(':prva_doza_status', $this->prva_doza_status);
      $stmt->bindParam(':druga_doza_datum', $this->druga_doza_datum);
      $stmt->bindParam(':druga_doza_status', $this->druga_doza_status);
      $stmt->bindParam(':oib', $this->oib);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }

   public function read_booked(){
 
    $query = "SELECT cij.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status, cij.vrsta_cjepiva, c.naziv_cjepiva FROM cijepljenje cij LEFT JOIN pacijenti pac ON cij.oib = pac.oib LEFT JOIN cjepiva c ON cij.vrsta_cjepiva = c.id  WHERE cij.druga_doza_status<>'Cijepljen'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_bookedSingle(){
 
    $query = 'SELECT cij.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status FROM '. $this->table . ' cij LEFT JOIN pacijenti pac ON cij.oib = pac.oib WHERE cij.oib = ? LIMIT 0,1;';
    
    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->oib, PDO::PARAM_STR);

    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {

    $this->ime = $row['ime']; 
    $this->prezime = $row['prezime']; 
    $this->adresa = $row['adresa'];
    $this->grad = $row['grad'];
    $this->zupanija = $row['zupanija'];
    $this->datum_rodenja = $row['datum_rodenja'];
    $this->vrsta_cjepiva = $row['vrsta_cjepiva'];
    $this->prva_doza_datum = $row['prva_doza_datum'];
    $this->prva_doza_status = $row['prva_doza_status'];
    $this->druga_doza_datum = $row['druga_doza_datum'];
    $this->druga_doza_status = $row['druga_doza_status'];
    }

   }

   public function update_booked(){
    $query = 'UPDATE ' .$this->table.' SET prva_doza_datum = :prva_doza_datum, prva_doza_status = :prva_doza_status, druga_doza_datum = :druga_doza_datum, druga_doza_status = :druga_doza_status WHERE oib = :oib';
    
    $stmt = $this->conn->prepare($query);

      $this->prva_doza_datum = htmlspecialchars(strip_tags($this->prva_doza_datum));
      $this->prva_doza_status = htmlspecialchars(strip_tags($this->prva_doza_status));
      $this->druga_doza_datum = htmlspecialchars(strip_tags($this->druga_doza_datum));
      $this->druga_doza_status = htmlspecialchars(strip_tags($this->druga_doza_status));
   
      $stmt->bindParam(':prva_doza_datum', $this->prva_doza_datum);
      $stmt->bindParam(':prva_doza_status', $this->prva_doza_status);
      $stmt->bindParam(':druga_doza_datum', $this->druga_doza_datum);
      $stmt->bindParam(':druga_doza_status', $this->druga_doza_status);
      $stmt->bindParam(':oib', $this->oib);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }

  public function read(){
 
    $query = "SELECT cij.oib, pac.ime, pac.prezime, pac.adresa, pac.grad, pac.zupanija, pac.datum_rodenja, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status, cij.vrsta_cjepiva, c.naziv_cjepiva FROM cijepljenje cij LEFT JOIN pacijenti pac ON cij.oib = pac.oib LEFT JOIN cjepiva c ON cij.vrsta_cjepiva = c.id WHERE cij.druga_doza_status='Cijepljen'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
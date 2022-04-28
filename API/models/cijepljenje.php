<?php 
 class Pacijent{
  private $conn;
  private $table='cijepi_se_cijepljenje';

  public $ime;
  public $prezime;
  public $adresa;
  public $grad;
  public $zupanija;
  public $OIB;
  public $datum_rodenja;
  public $naziv_cjepiva;
  public $vrsta_cjepiva;
  public $prva_doza_datum;
  public $prva_doza_status;
  public $druga_doza_datum;
  public $druga_doza_status;
  public $token;

  public function __construct($db){
   $this->conn = $db;
  }

  public function read_na_cekanju(){
    //query
 
    $query = "SELECT cij.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, cij.token FROM cijepi_se_cijepljenje cij LEFT JOIN cijepi_se_korisnici k ON cij.OIB = k.OIB WHERE cij.vrsta_cjepiva IS NULL";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_na_cekanjuSingle(){
    //query
 
    $query = 'SELECT TOP 1 cij.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, cij.token, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status FROM '. $this->table . ' cij LEFT JOIN cijepi_se_korisnici k ON cij.OIB = k.OIB WHERE cij.OIB = ?';
    
    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->OIB, PDO::PARAM_INT);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $this->OIB = $row['OIB'];
    $this->ime = $row['ime']; 
    $this->prezime = $row['prezime']; 
    $this->adresa = $row['adresa'];
    $this->grad = $row['grad'];
    $this->zupanija = $row['zupanija'];
    $this->datum_rodenja = $row['datum_rodenja'];
    $this->token = $row['token'];
    $this->vrsta_cjepiva = $row['vrsta_cjepiva'];
    $this->prva_doza_datum = $row['prva_doza_datum'];
    $this->prva_doza_status = $row['prva_doza_status'];
    $this->druga_doza_datum = $row['druga_doza_datum'];
    $this->druga_doza_status = $row['druga_doza_status'];

   }

   public function update_na_cekanju(){
    $query = 'UPDATE ' .$this->table.' SET  vrsta_cjepiva= :vrsta_cjepiva, prva_doza_datum = :prva_doza_datum, prva_doza_status = :prva_doza_status, druga_doza_datum = :druga_doza_datum, druga_doza_status = :druga_doza_status WHERE OIB = :OIB';
    
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
      $stmt->bindParam(':OIB', $this->OIB);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }

   public function read_naruceni(){
    //query
 
    $query = "SELECT cij.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status, cij.token, cij.vrsta_cjepiva, c.naziv_cjepiva FROM cijepi_se_cijepljenje cij LEFT JOIN cijepi_se_korisnici k ON cij.OIB = k.OIB LEFT JOIN cijepi_se_cjepiva c ON cij.vrsta_cjepiva = c.ID  WHERE cij.druga_doza_status<>'Cijepljen'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   public function read_naruceniSingle(){
    //query
 
    $query = 'SELECT TOP 1 cij.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, cij.token, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status FROM '. $this->table . ' cij LEFT JOIN cijepi_se_korisnici k ON cij.OIB = k.OIB WHERE cij.OIB = ?';
    
    $stmt = $this->conn->prepare($query);

    $stmt->bindValue(1, $this->OIB, PDO::PARAM_INT);

    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC))
    {

    $this->ime = $row['ime']; 
    $this->prezime = $row['prezime']; 
    $this->adresa = $row['adresa'];
    $this->grad = $row['grad'];
    $this->zupanija = $row['zupanija'];
    $this->datum_rodenja = $row['datum_rodenja'];
    $this->token = $row['token'];
    $this->vrsta_cjepiva = $row['vrsta_cjepiva'];
    $this->prva_doza_datum = $row['prva_doza_datum'];
    $this->prva_doza_status = $row['prva_doza_status'];
    $this->druga_doza_datum = $row['druga_doza_datum'];
    $this->druga_doza_status = $row['druga_doza_status'];
    }

   }

   public function update_naruceni(){
    $query = 'UPDATE ' .$this->table.' SET prva_doza_datum = :prva_doza_datum, prva_doza_status = :prva_doza_status, druga_doza_datum = :druga_doza_datum, druga_doza_status = :druga_doza_status WHERE OIB = :OIB';
    
    $stmt = $this->conn->prepare($query);

      $this->prva_doza_datum = htmlspecialchars(strip_tags($this->prva_doza_datum));
      $this->prva_doza_status = htmlspecialchars(strip_tags($this->prva_doza_status));
      $this->druga_doza_datum = htmlspecialchars(strip_tags($this->druga_doza_datum));
      $this->druga_doza_status = htmlspecialchars(strip_tags($this->druga_doza_status));
   
      $stmt->bindParam(':prva_doza_datum', $this->prva_doza_datum);
      $stmt->bindParam(':prva_doza_status', $this->prva_doza_status);
      $stmt->bindParam(':druga_doza_datum', $this->druga_doza_datum);
      $stmt->bindParam(':druga_doza_status', $this->druga_doza_status);
      $stmt->bindParam(':OIB', $this->OIB);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }

  public function read(){
    //query
 
    $query = "SELECT cij.OIB, k.ime, k.prezime, k.adresa, k.grad, k.zupanija, k.datum_rodenja, cij.vrsta_cjepiva, cij.prva_doza_datum, cij.prva_doza_status, cij.druga_doza_datum, cij.druga_doza_status, cij.token, cij.vrsta_cjepiva, c.naziv_cjepiva FROM cijepi_se_cijepljenje cij LEFT JOIN cijepi_se_korisnici k ON cij.OIB = k.OIB LEFT JOIN cijepi_se_cjepiva c ON cij.vrsta_cjepiva = c.ID WHERE cij.druga_doza_status='Cijepljen'";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
 
    return $stmt;
   }

   
  
 }
?>
<?php 
 class Profil{
  private $conn;
  private $table='pacijenti';

  public $ime;
  public $prezime;
  public $adresa;
  public $grad;
  public $zupanija;
  public $datum_rodenja;
  public $punkt_cijepljenja;
  public $oib;

  public function __construct($db){
   $this->conn = $db;
  }

   public function read_profileSingle(){
 
    $query = 'SELECT p.ime, p.prezime, p.adresa, p.grad, p.zupanija, p.datum_rodenja, p.punkt_cijepljenja, p.oib  FROM '. $this->table . ' p WHERE p.oib = ? LIMIT 0,1;';
    
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
    $this->punkt_cijepljenja = $row['punkt_cijepljenja'];

   }

   public function update_profile(){
    $query = 'UPDATE ' .$this->table.' SET  ime = :ime, prezime = :prezime, adresa = :adresa, grad = :grad, zupanija = :zupanija, datum_rodenja = :datum_rodenja, punkt_cijepljenja = :punkt_cijepljenja WHERE oib = :oib';
    
    $stmt = $this->conn->prepare($query);

      $this->ime = htmlspecialchars(strip_tags($this->ime));
      $this->prezime = htmlspecialchars(strip_tags($this->prezime));
      $this->adresa = htmlspecialchars(strip_tags($this->adresa));
      $this->grad= htmlspecialchars(strip_tags($this->grad));
      $this->zupanija = htmlspecialchars(strip_tags($this->zupanija));
      $this->datum_rodenja = htmlspecialchars(strip_tags($this->datum_rodenja));
      $this->punkt_cijepljenja = htmlspecialchars(strip_tags($this->punkt_cijepljenja));

      $stmt->bindParam(':ime', $this->ime);
      $stmt->bindParam(':prezime', $this->prezime);
      $stmt->bindParam(':adresa', $this->adresa);
      $stmt->bindParam(':grad', $this->grad);
      $stmt->bindParam(':zupanija', $this->zupanija);
      $stmt->bindParam(':datum_rodenja', $this->datum_rodenja);
      $stmt->bindParam(':punkt_cijepljenja', $this->punkt_cijepljenja);
      $stmt->bindParam(':oib', $this->oib);
      if($stmt->execute()) {
        return true;
      }else{
       echo "Error code: " .$stmt->errorCode();
       return false;
      }
    
   }


  
 }
?>
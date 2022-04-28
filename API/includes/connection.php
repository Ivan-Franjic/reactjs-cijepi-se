<?php
    class Database  
				{
                    private $host = '193.198.57.183';
					private $dbname = 'STUDENTI_PIN';
					private $username = 'pin';
					private $password = 'Vsmti1234!';
					private $conn;
					
					public function connect(){
					$this->conn = null;

					try
					{
						$this->conn = new PDO('sqlsrv:Server='.$this->host.';Database='.$this->dbname, $this->username, $this->password);
					}
					catch (PDOException $e)
					{
						echo $e;
					}
                    return $this->conn;
                }
            }
?>
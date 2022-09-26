<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__.'/includes/connection.php';
require __DIR__.'/includes/JwtHandler.php';

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->connect();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->oib) 
    || !isset($data->lozinka)
    || empty(trim($data->oib))
    || empty(trim($data->lozinka))
    ):

    $fields = ['fields' => ['oib','lozinka']];
    $returnData = msg(0,422,'Molimo popunite sva polja!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:
    $oib = trim($data->oib);
    $lozinka = trim($data->lozinka);

    // IF OIB IS LESS THAN 11 SHOW THE ERROR
    if(strlen($oib) < 11):
        $returnData = msg(0,422,'Neispravan oib!');
    
    // IF PASSWORD IS LESS THAN 8 SHOW THE ERROR
    elseif(strlen($lozinka) < 8):
        $returnData = msg(0,422,'Lozinka mora sadržavati barem 8 znakova!');

    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    else:
        try{
            
            $fetch_user_by_oib = "SELECT * FROM `korisnici` WHERE `oib`=:oib";
            $query_stmt = $conn->prepare($fetch_user_by_oib);
            $query_stmt->bindValue(':oib', $oib,PDO::PARAM_STR);
            $query_stmt->execute();

            // IF THE USER IS FOUNDED BY OIB
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($lozinka, $row['lozinka']);


                // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if($check_password):

                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://localhost/vuv-cijepi-se/API/',
                        array("user_id"=> $row['id'],
                        "oib"=> $row['oib']
                        )
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'Uspješno ste prijavljeni!',
                        'token' => $token
                    ];


                // IF INVALID PASSWORD
                
                else:
                    $returnData = msg(0,422,'Netočna lozinka!');
                endif;

            // IF THE USER IS NOT FOUNDED BY OIB THEN SHOW THE FOLLOWING ERROR
            else:
                $returnData = msg(0,422,'Netočan oib!');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);
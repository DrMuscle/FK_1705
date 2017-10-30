<?php
    $json_string = file_get_contents('php://input');

    $obj = json_decode($json_string,true);

    $Manager = new DBManager();
    $id = $Manager->insertUser();

    echo json_encode(array( "id" => $id ));

class DBLoginInfo{
    public $userId = 'niwaka';
    public $password = 'password';
    public $dbhost = 'localhost';
    public $dbname = 'niwakamentaiko';
}
class DBManager{
    private $pdo;

    //-----DB-----
    function dbConnect(){
        $dbLoginInfo = new DBLoginInfo();	
        $this->pdo = new PDO(
            'mysql:host='.$dbLoginInfo->dbhost.';dbname='.$dbLoginInfo->dbname.';charset=utf8',
            $dbLoginInfo->userId,
            $dbLoginInfo->password,
            array(PDO::ATTR_EMULATE_PREPARES => false)
        );
    }

    function dbDisconnect(){
        unset($this->pdo);
    }

    function insertUser(){
        try{
            $this->dbConnect();

            $rand = null;

            do{
                $rand = rand(0,999999);
            }while($this->checkUser($rand));

var_dump($this->pdo);
exit;
            $stmt = $this->pdo->prepare("
                INSERT INTO user(userid) VALUES(:user_id)
            ");
            $stmt->bindValue(':user_id',$rand,PDO::PARAM_STR);
            $stmt->execute();

            $this->dbDisconnect();

            return $rand;
        }catch(PDOException $e){
            echo '書き込み失敗。'.$e->getMessage();
            throw $e;
        }
    }

    function checkUser($userid){
         try{
            $this->dbConnect();

            $stmt = $this->pdo->prepare("
                SELECT * FROM user WHERE userid = :userid
            ");
            $stmt->bindValue(":userid",$userid,PDO::PARAM_STR);
            
            $stmt->execute();

            $array=array();
            if($stmt->fetch(PDO::FETCH_ASSOC)){
                $this->dbDisconnect();
                return false;
            }

            $this->dbDisconnect();
            return true;
        }catch(PDOException $e){
            echo '書き込み失敗。'.$e->getMessage();
            throw $e;
        }
    }
}
?>
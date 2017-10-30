<?php
session_start();
$dbMng = new DBManager();
$queue = 'no';
switch ($_POST['type']) {
    case 'receive':
        switch ($_POST['category']) {
            case 'host':
                $row = $dbMng->getJoinUser();
                if($row['join_user']){
                    $queue = 'success';
                }
                break;
            
            case 'trade':
                $row = $dbMng->getTradeStatus();
                $oppUserid = $_SESSION['position'] == 'host' ? 'join_user' : 'host_user';
                if($row[$oppUserid]){
                    $queue = $row[$oppUserid];
                }
                break;
            case 'broken':
                $row = $dbMng->getBrokenStatus();
                if(!empty($row)){
                    $queue = '相手が割った';
                }
                break;
        }
        break;
    
    case 'send':
        switch($_POST['category']){
            case 'host':
                $_SESSION['roomid']   = $dbMng->host($_POST['userid']);
                $_SESSION['position'] = 'host';
                $queue = 'success';
                break;
            case 'join':
                if($roomid = $dbMng->getRoomid($_POST['hostid'])){
                    $_SESSION['position'] = 'join';
                    $_SESSION['roomid'] = $roomid;

                    $dbMng->join($roomid,$_POST['userid']);
                    $dbMng->startConnect();
                    $queue = $roomid;
                }else{
                    $queue = 'error';
                }
                break;
            case 'trade':
                $dbMng->updateTrade($_POST['option']);
                $queue = $_POST['option'];
                break;
            case 'broken':
                $dbMng->updateBroken();
                $queue = 'じぶんが割った';
                break;
        }
        break;
}

echo $queue;

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

            $sql = "INSERT INTO user(userid) VALUES (:userid);";

            $rand;
            while(false === $this->checkUser($rand = rand(0,999999)));

            $stmt = $this->myPDO->prepare($sql);
            $stmt->bindValue(":userid",$rand,PDO::PARAM_STR);

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

            $sql = "SELECT * FROM user WHERE userid=:userid";

            $stmt = $this->myPDO->prepare($sql);
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

    function host($userid){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            INSERT INTO room(host_user) VALUES(:host_user)
        ");
        $stmt->bindValue(':host_user',$userid,PDO::PARAM_STR);
        $stmt->execute();
        return $this->pdo->lastInsertId('room_id');
    }
    function startConnect(){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            INSERT INTO trade(room_id) VALUES(:room_id)
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();

        $stmt = $this->pdo->prepare("
            INSERT INTO broken(room_id) VALUES(:room_id)
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
    }
    function join($roomid,$joinUserid){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            UPDATE room SET join_user = :join_userid WHERE room_id = :room_id
        ");
        $stmt->bindValue(':room_id',$roomid,PDO::PARAM_STR);
        $stmt->bindValue(':join_userid',$joinUserid,PDO::PARAM_STR);
        $stmt->execute();
    }

    function getJoinUser(){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            SELECT join_user FROM room WHERE room_id = :room_id
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch();
    }
    function getRoomid($userid){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            SELECT room_id FROM room WHERE host_user = :host_user ORDER BY room_id DESC
        ");
        $stmt->bindValue(':host_user',$userid,PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch();
        return $row['room_id'];
    }
    function getTradeStatus(){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            SELECT * FROM trade WHERE room_id = :room_id
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch();
    }
    function updateTrade($option){
        $this->dbConnect();
        $oppUserid = $_SESSION['position'] == 'host' ? 'host_user' : 'join_user' ;
        $str = "UPDATE trade SET ".$oppUserid." = :option WHERE room_id = :room_id";
        $stmt = $this->pdo->prepare($str);
        $stmt->bindValue(':option',$option,PDO::PARAM_STR);
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
    }
    function getBrokenStatus(){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            SELECT flg FROM broken WHERE room_id = :room_id
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
        $row = $stmt->fetch();
        return $row['flg'];
    }
    function updateBroken(){
        $this->dbConnect();
        $stmt = $this->pdo->prepare("
            UPDATE broken SET flg = 1 WHERE room_id = :room_id
        ");
        $stmt->bindValue(':room_id',$_SESSION['roomid'],PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch();
    }
    
}

?>
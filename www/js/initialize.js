
function initialize(){
    userid = localStorage.getItem('userId');
    if(!userid){
        var getCodeURI = "http://ec2-54-65-100-211.ap-northeast-1.compute.amazonaws.com/code/firstAccess.php";
            $.ajax({
                error   : function (e, f, d) {
                },
                success : function (b) {
                    var idData = JSON.parse(b);
                    localStorage.setItem('userId',idData.id);
                    userid = idData.id;
                },
                url     : getCodeURI
            });
    }
    
    var json = localStorage.getItem('contactList');
    if(json){
        contactList = JSON.parse(json);
    }
}
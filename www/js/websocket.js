var WebSocket = function (){
    this.postSec = 0.1;
    this.postInterval = this.postSec * 1000;
    this.receiver;
}
WebSocket.prototype.send = function(category,type,option = 'def'){
    return $.ajax({
        data    : {
            category : category,
            type : type,
            option : option
        },
        error   : function (e, f, d) {
            alert('通信に失敗しました');
        },
        success : function (b) {
        },
        type    : "POST",
        url     : "http://webdriving.ddns.net/ajax/websocket2"
    });
}

WebSocket.prototype.host = function(id){
    $.ajax({
        data    : {
            userid : id,
            category : 'host',
            type : 'send'
        },
        error   : function (e, f, d) {
            alert('通信に失敗しました');
            return;
        },
        success : function (b) {
            sessionStorage.setItem('position', 'left');
            websocket.startReceive('host');
        },
        type    : "POST",
        url     : "http://webdriving.ddns.net/ajax/websocket2"
    });
}
WebSocket.prototype.join = function(hostid,userid){
    this.stopReceive();
    $.ajax({
        data    : {
            hostid : hostid,
            userid : userid,
            category : 'join',
            type : 'send'
        },
        error   : function (e, f, d) {
            alert('通信に失敗しました');
            return;
        },
        success : function (b) {
            console.log(b);
            sessionStorage.setItem('position', 'right');
            location.href = 'papico.html';
        },
        type    : "POST",
        url     : "http://webdriving.ddns.net/ajax/websocket2"
    });
}
WebSocket.prototype.startReceive = function(category){
    var _websocket = this;
    this.receiver = setInterval(function(){
        _websocket.send(category,'receive').done(function(result) {
            if(result != 'no'){
                switch(category){
                    case 'host':
                        _websocket.stopReceive();
                        location.href = 'papico.html';
                        break;
                    
                    case 'trade':
                        _websocket.stopReceive();
                        contactList = JSON.parse(result);
                        $.when(oppPapico()).done(readyMain());
                        websocket.startReceive('broken');
                        break;
                    case 'broken':
                        _websocket.stopReceive();
                        papicoBreak();
                    
                }
            }
        });
    },_websocket.postInterval);
}
WebSocket.prototype.stopReceive = function(){
    clearInterval(this.receiver);
}
WebSocket.prototype.trade = function(category,option){
    $.when(this.send(category,'send',option)).done(websocket.startReceive('trade'));
}
WebSocket.prototype.broken = function(category){
    this.send(category,'send');
}
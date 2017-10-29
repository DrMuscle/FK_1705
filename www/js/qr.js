$(function(){
    $(document).ready(function(){
        
        var id = localStorage.getItem('userId');
        var allWidth = $(document).width();
        console.log(allWidth);
        $('#qrcode').qrcode({width:allWidth/2, height:allWidth/2, text: id});
        console.log($('#qrcode').width());
        console.log($('#qrcode').height());
        $('.camera-btn-container').css('background-color','#ffffff');
        //scanBarcode();
    });
    $(document).on('click','.camera-btn-container',function(){
        scanBarcode();
    });
    $(document).on('click','.left',function(){
        history.back();
    });
});

var scanBarcode = function(){
    $('.camera-btn-container').css('background-color','#aaaaaa');
    window.plugins.barcodeScanner.scan( 
        function(result) {
            //console.log(result.text);
            //console.log(result.text.length);
            if(result.text.length){
                websocket.join(result.text,userid);
                //location.href = 'papico.html';
            }
            if(!$('#qrcode canvas').length){
                var id = localStorage.getItem('userId');
                var allWidth = $(document).width();
                $('#qrcode').qrcode({width:allWidth/2, height:allWidth/2, text: id});
            }
            $('.camera-btn-container').css('background-color','#ffffff');
        }, function(error) {
            //alert("Scanning failed: " + error);
        }
    );
};
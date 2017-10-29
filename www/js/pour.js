// This is a JavaScript file
$(function(){
    $(document).on('ready', function(){
        if(myPosition == "left"){
            $('.wrap-right-color-block').append('<div class="unknown-block"></div>');
            $('.bottom-right').prepend('<img src="./img/hatena.png" class="hatena-right-img">');
            $('.bottom-left img').css('backgroundColor','white');
        } else {
            $('.wrap-left-color-block').append('<div class="unknown-block"></div>');
            $('.bottom-left').prepend('<img src="./img/hatena.png" class="hatena-left-img">');
            $('.bottom-right img').css('backgroundColor','white');
        }
        var contactList = JSON.parse(localStorage.getItem("contactList"));
        if(!contactList.phone) {
            $('#phone').prop('disabled', true);
        }
        if(!contactList.mail) {
            $('#mail').prop('disabled', true);
        }
        if(!contactList.line) {
            $('#line').prop('disabled', true);
        }
        if(!contactList.twitter) {
            $('#twitter').prop('disabled', true);
        }
        if(!contactList.facebook) {
            $('#facebook').prop('disabled', true);
        }
        if(!contactList.instagram) {
            $('#instagram').prop('disabled', true);
        }
    });
});
$(function(){
    $('.wrap-choices').on('click', function(){
        $('.wrap-left-color-block').text('');
        $('.wrap-right-color-block').text('');
        if(myPosition == "left"){
            
            $('.bottom-left img').css('backgroundColor','rgba(255,255,255,0)');
            
            if($('#phone').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="phone-block"></div>');
            }
            if($('#mail').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="mail-block"></div>');
            }
            if($('#line').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="line-block"></div>');
            }
            if($('#twitter').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="twitter-block"></div>');
            }
            if($('#facebook').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="facebook-block"></div>');
            }
            if($('#instagram').prop('checked')){
                $('.wrap-left-color-block').prepend('<div class="instagram-block"></div>');
            }
            $('.wrap-right-color-block').append('<div class="unknown-block"></div>');
            if(!$('.wrap-left-color-block div').length){
                console.log('a');
                $('.bottom-left img').css('backgroundColor','rgba(255,255,255,1)');
            }
        } else {
            
            
            $('.bottom-right img').css('backgroundColor','rgba(255,255,255,0)');
            
            
            if($('#phone').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="phone-block"></div>');
            }
            if($('#mail').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="mail-block"></div>');
            }
            if($('#line').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="line-block"></div>');
            }
            if($('#twitter').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="twitter-block"></div>');
            }
            if($('#facebook').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="facebook-block"></div>');
            }
            if($('#instagram').prop('checked')){
                $('.wrap-right-color-block').prepend('<div class="instagram-block"></div>');
            }
            $('.wrap-left-color-block').append('<div class="unknown-block"></div>');
            if(!$('.wrap-right-color-block div').length){
                console.log('b');
                $('.bottom-right img').css('backgroundColor','rgba(255,255,255,1)');
            }
        }
    });
});

function papicoComplete(){
    if(!$('#phone').prop('checked') && !$('#mail').prop('checked') && !$('#line').prop('checked') && !$('#twitter').prop('checked') && !$('#facebook').prop('checked') && !$('#instagram').prop('checked')){
        alert("いずれかを選択した上で押してください");
        return;
    }
    var oppContactList = {};
    if($('#phone').prop('checked')){
        oppContactList.phone = contactList.phone; 
    }
    if($('#mail').prop('checked')){
        oppContactList.mail = contactList.mail; 
    }
    if($('#line').prop('checked')){
        oppContactList.line = contactList.line; 
    }
    if($('#twitter').prop('checked')){
        oppContactList.twitter = contactList.twitter; 
    }
    if($('#facebook').prop('checked')){
        oppContactList.facebook = contactList.facebook; 
    }
    if($('#instagram').prop('checked')){
        oppContactList.instagram = contactList.instagram; 
    }
    $('.wrap-choices').css('display','none');
    $('.papico-main').css('height', '90%');
    websocket.trade('trade',JSON.stringify(oppContactList));
    marchSetData();
}

function oppPapico(){
    if(myPosition == "left"){
        $('.wrap-right-color-block').text('');
        if(contactList.phone){
            $('.wrap-right-color-block').prepend('<div class="phone-block"></div>');
        }
        if(contactList.mail){
            $('.wrap-right-color-block').prepend('<div class="mail-block"></div>');
        }
        if(contactList.line){
            $('.wrap-right-color-block').prepend('<div class="line-block"></div>');
        }
        if(contactList.twitter){
            $('.wrap-right-color-block').prepend('<div class="twitter-block"></div>');
        }
        if(contactList.facebook){
            $('.wrap-right-color-block').prepend('<div class="facebook-block"></div>');
        }
        if(contactList.instagram){
            $('.wrap-right-color-block').prepend('<div class="instagram-block"></div>');
        }
    } else {
        $('.wrap-left-color-block').text('');
        if(contactList.phone){
            $('.wrap-left-color-block').prepend('<div class="phone-block"></div>');
        }
        if(contactList.mail){
            $('.wrap-left-color-block').prepend('<div class="mail-block"></div>');
        }
        if(contactList.line){
            $('.wrap-left-color-block').prepend('<div class="line-block"></div>');
        }
        if(contactList.twitter){
            $('.wrap-left-color-block').prepend('<div class="twitter-block"></div>');
        }
        if(contactList.facebook){
            $('.wrap-left-color-block').prepend('<div class="facebook-block"></div>');
        }
        if(contactList.instagram){
            $('.wrap-left-color-block').prepend('<div class="instagram-block"></div>');
        }
    }
}
$(function(){
    $('.phone').on('click', function(){
        if($('#phone').is(':disabled')){
            alert("電話番号は未設定項目です。");
        } 
    })
    $('.mail').on('click', function(){
        if($('#mail').is(':disabled')){
            alert("メールアドレスは未設定項目です。");
        } 
    })
    $('.line').on('click', function(){
        if($('#line').is(':disabled')){
            alert("LINEアカウントは未設定項目です。");
        } 
    })
    $('.twitter').on('click', function(){
        if($('#twitter').is(':disabled')){
            alert("twitterアカウントは未設定項目です。");
        } 
    })
    $('.facebook').on('click', function(){
        if($('#facebook').is(':disabled')){
            alert("facebookアカウントは未設定項目です。");
        } 
    })
    $('.instagram').on('click', function(){
        if($('#instagram').is(':disabled')){
            alert("instagramアカウントは未設定項目です。");
        } 
    });
});
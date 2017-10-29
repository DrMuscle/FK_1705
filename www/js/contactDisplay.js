var contactFlg = 0;
var yajirusiFlg = 0;
$(function(){
    $(document).ready(function(){

});
    $('.cap').touchwipe({
        wipeDown: function() {
            if(contactFlg === '1'){
                contactFlg = '2';
                degNum = 120;
                if(myPosition === 'right') degNum = -120;
                $({deg:0}).animate({deg:degNum}, {
                    duration:1000,
                progress:function() {
                    $('.cap').css({
                        transform:'rotate(' + this.deg + 'deg)'
                    });
                },
                complete:function() {
                    $('.yajirusi').remove();
                    appendMiddleYajirusi();
                    /*
                    Object.keys(contactList).forEach(function (key) {
                        var appendData = '<div class="contact-container" data-sns="' + key + '">';
                        appendData += '<img src="./img/' + key + '.png" alt="" />';
                        appendData += '<div class="id-label">' + contactList[key] + '</div>';
                        appendData += '</div>';
                        $('.contact-main-container').append(appendData).hide().slideDown('slow');
                    });
                    */
                }
            });  
        }
        },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    });
    $(document).on('click','.contact-main-container .contact-container div',function(){
        //console.log($(this).parent().attr('data-sns'));
        var snsStr = $(this).parent().attr('data-sns');
        var ref;
        switch(snsStr){
            case 'instagram':
                ref = cordova.InAppBrowser.open('http://www.instagram.com/' + $(this).html() , '_blank', 'location=yes');
                break;
            case 'facebook':
                ref = cordova.InAppBrowser.open('http://www.facebook.com/' + $(this).html() , '_blank', 'location=yes');
                break;
            case 'twitter':
                ref = cordova.InAppBrowser.open('http://twitter.com/' + $(this).html(), '_blank', 'location=yes');
                break;
            case 'line':
                ref = cordova.InAppBrowser.open('http://line.me/ti/p/' + $(this).html(), '_blank', 'location=yes');
                break;
            case 'mail':
                mailSave($(this).html());
                break;
            case 'phone':
                phoneSave($(this).html());
                break;
        }
    });
});
var rightPapicoMove = function(){
    var allWidth = $(document).width();
    var papicoWidth = $('.wrap-right-papico').width();
    var move = parseInt(allWidth) - parseInt(papicoWidth);
    $('.wrap-right-papico').animate(
        {
            'margin-left' : papicoWidth * 2 + move,
        },
        {
            duration: 'slow',
            complete: function(){
                setTimeout('appendYajirusi()', 500);
                rect();
            }
        }
    );
};
var phoneSave = function(num){
    function onSuccess(contact) {
        alert("電話帳に保存しました");
    };
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    var contact = navigator.contacts.create();
    var phoneNumbers = [];
    phoneNumbers[0] =  new ContactField('mobile',num,'true');
    contact.phoneNumbers = phoneNumbers;
    contact.save(onSuccess,onError);
};
var mailSave = function(mailStr){
    function onSuccess(contact) {
        alert("電話帳に保存しました");
    };
    function onError(contactError) {
        alert("Error = " + contactError.code);
    };
    var contact = navigator.contacts.create();
    var mail = [];
    mail[0] =  new ContactField('mail',mailStr,'true');
    contact.emails = mail;
    contact.save(onSuccess,onError);
};
var rect = function(){
    $('.yajirusi').animate({
        marginTop: '-=5%'
    }, 800).animate({
        marginTop: '+=5%'
    }, 800);
    setTimeout('rect()', 100);
}
var papicoReady = function(){
    contactFlg = '1';
    switch(myPosition){
        case 'left':
            console.log('left');
            rightPapicoMove();
            break;
        case 'right':
            console.log('right');
            appendYajirusi();
            rect();
            break;
    }
}
var appendYajirusi = function(){
    $('.center-line').remove();
    if(yajirusiFlg === 0){
        var off;
        switch(myPosition){
            case 'left':
                off = $('.top-right').offset();
                break;
            case 'right':
                off = $('.top-left').offset();
                break;
        }
        var leftWidth = $('.top-left').width();
        var appendData = '<div class="yajirusi top-yajirusi">';
        appendData += '<img src="./img/01.png" alt="" />';
        appendData += '</div>';
        $('body').append(appendData);
        $('.top-yajirusi').touchwipe({
            wipeDown: function() {
                if(contactFlg === '1'){
                    contactFlg = '2';
                    degNum = 120;
                    if(myPosition === 'right') degNum = -120;
                    $({deg:0}).animate({deg:degNum}, {
                        duration:1000,
                        progress:function() {
                            $('.cap').css({
                                transform:'rotate(' + this.deg + 'deg)'
                            });
                        },
                        complete:function() {
                            $('.yajirusi').remove();
                            appendMiddleYajirusi();
                            /*
                            Object.keys(contactList).forEach(function (key) {
                                var appendData = '<div class="contact-container" data-sns="' + key + '">';
                                appendData += '<img src="./img/' + key + '.png" alt="" />';
                                appendData += '<div class="id-label">' + contactList[key] + '</div>';
                                appendData += '</div>';
                                $('.contact-main-container').append(appendData).hide().slideDown('slow');
                            });
                            */
                        }
                    });  
                }
            },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: true
        });
        $('.yajirusi').css('top',off.top);
        switch(myPosition){
            case 'left':
                $('.yajirusi').css('left', off.left + leftWidth/1.6);
                break;
            case 'right':
                $('.yajirusi').css('left', off.left + leftWidth/9);
                break;
        }
        off = $('.yajirusi').offset();
    }
    yajirusiFlg++;
}
var appendMiddleYajirusi = function(){
    var off;
    switch(myPosition){
        case 'left':
            off = $('.top-right').offset();
            break;
        case 'right':
            off = $('.top-left').offset();
            break;
    }
    var leftWidth = $('.top-left').width();
    var windowHeight = $(window).height();
    var appendData = '<div class="yajirusi middle-yajirusi">';
    appendData += '<img src="./img/01.png" alt="" />';
    appendData += '</div>';
    $('body').append(appendData);
    $('.papico-main').touchwipe({
        wipeDown: function() {
            if(contactFlg == 2){
                contactFlg++;
                $('.yajirusi').remove();
                var papicoWidth = $('.wrap-right-papico').width();
                var papikoHeight = $('.wrap-right-papico').height();
                switch(myPosition){
                    case 'left':
                        $('.wrap-left-papico').css('visibility','hidden');
                        $('.papico-right').animate(
                            {
                                'width' : '50vw'
                            },
                            {
                                duration: 1000,
                                    complete: function(){
                                    $('.papico-img').animate(
                                        {
                                            'width' : '50vw'
                                        },
                                        {
                                            duration: 500,
                                            complete: function(){
                                                
                                            }
                                        }
                                    );
                                }
                            }
                        );
                        $('.wrap-right-papico').animate(
                            {
                                //'height' : '50%',
                                'margin-top' : '70%'
                            },
                            {
                                duration: 1000,
                                complete: function(){
                                    $('.wrap-right-papico').animate(
                                        {
                                            //'height' : '140%',
                                            'margin-top' : '-60%'
                                        },
                                        {
                                            duration: 500,
                                            complete: function(){
                                                $('.wrap-right-color-block').animate({
                                                    marginTop: '-1000px'
                                                }, 500);
                                                Object.keys(contactList).forEach(function (key) {
                                                    var appendData = '<div class="contact-container" data-sns="' + key + '">';
                                                    appendData += '<img src="./img/' + key + '.png" alt="" />';
                                                    appendData += '<div class="id-label">' + contactList[key] + '</div>';
                                                    appendData += '</div>';
                                                    $('.contact-main-container').append(appendData).hide().slideDown('slow');
                                                });
                                                
                                                $('.papico-right').animate(
                                                    {
                                                        'width' : '30vw'
                                                    },
                                                    {
                                                        duration: 1000,
                                                        complete: function(){
                                                        
                                                        }
                                                    }
                                                );
                                                $('.wrap-right-papico').animate(
                                                    {
                                                        //'height' : '100%',
                                                        'margin-top' : '-10%'
                                                    },
                                                    {
                                                        duration: 1000,
                                                        complete: function(){
                                                        
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                    
                                }
                            }
                        );
                        break;
                    case 'right':
                        $('.wrap-right-papico').css('visibility','hidden');
                        $('.papico-left').animate(
                            {
                                'width' : '50vw'
                            },
                            {
                                duration: 1000,
                                    complete: function(){
                                    $('.papico-img').animate(
                                        {
                                            'width' : '50vw'
                                        },
                                        {
                                            duration: 500,
                                            complete: function(){
                                                
                                            }
                                        }
                                    );
                                }
                            }
                        );
                        $('.wrap-left-papico').animate(
                            {
                                'height' : '50%',
                                'margin-top' : '70%'
                            },
                            {
                                duration: 1000,
                                complete: function(){
                                    $('.wrap-left-papico').animate(
                                        {
                                            'height' : '140%',
                                            'margin-top' : '-60%'
                                        },
                                        {
                                            duration: 500,
                                            complete: function(){
                                                $('.wrap-left-color-block').animate({
                                                    marginTop: '-1000px'
                                                }, 500);
                                                Object.keys(contactList).forEach(function (key) {
                                                    var appendData = '<div class="contact-container" data-sns="' + key + '">';
                                                    appendData += '<img src="./img/' + key + '.png" alt="" />';
                                                    appendData += '<div class="id-label">' + contactList[key] + '</div>';
                                                    appendData += '</div>';
                                                    $('.contact-main-container').append(appendData).hide().slideDown('slow');
                                                });
                                                $('.papico-left').animate(
                                                    {
                                                        'width' : '30vw'
                                                    },
                                                    {
                                                        duration: 1000,
                                                        complete: function(){
                                                        
                                                        }
                                                    }
                                                );
                                                $('.wrap-left-papico').animate(
                                                    {
                                                        'height' : '100%',
                                                        'margin-top' : '-10%'
                                                    },
                                                    {
                                                        duration: 1000,
                                                        complete: function(){
                                                        
                                                        }
                                                    }
                                                );
                                                
                                            }
                                        }
                                    );
                                    
                                }
                            }
                        );
                        break;
                }
            }
            
        },
        min_move_x: 20,
        min_move_y: 20,
        preventDefaultEvents: true
    });
    $('.yajirusi').css('top', windowHeight/2);
    switch(myPosition){
        case 'left':
            $('.yajirusi').css('left', off.left + leftWidth/1.6);
            //rect();
            break;
        case 'right':
            $('.yajirusi').css('left', off.left + leftWidth/9);
            //rect();
            break;
    }
    off = $('.yajirusi').offset();
}


/*MARCH*/
var papicoWrap;
var papicoLeft;
var papicoRight;
function marchSetData(){
    papicoWrap = $('.papico-main');
    papicoLeft = $('.wrap-left-papico');
    papicoRight = $('.wrap-right-papico');
    $('.hatena-left-img').remove();
    $('.hatena-right-img').remove();   
}

function readyMain(){
    switch(myPosition){
        case 'right':
            setTimeout(function(){
                var x = ($(window).width() - (papicoLeft.offset().left + papicoLeft.outerWidth() +  papicoRight.outerWidth()) +  papicoRight.outerWidth());
                papicoWrap.animate({  
                    'margin-left' : +x
                },
                {  
                    duration: 700,
                    complete: function(){window.addEventListener('devicemotion', checkAcceleraion)} //アニメーション終了後加速度センサー取得スタート
                })
            },1000);
            break;
        case 'left':
            setTimeout(function(){
                var x = papicoRight.offset().left;
                papicoWrap.animate({  
                    'margin-left' : -x
                },  
                {  
                    duration: 700,
                    complete: function(){window.addEventListener('devicemotion', checkAcceleraion)} //アニメーション終了後加速度センサー取得スタート
                })
            },1000);
            break;
    }
}

function splash(){
    console.log('eeee');
    var min = 10 ;
    var max = 20 ;
    
    var rand = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    
    if(myPosition == 'left'){
        var cap = $('.top-right');
        for(var i = 0;i < rand;i++){
            var x = Math.floor( Math.random() * (5000 + 1 - 4000) ) + 4000 ;
            var y = Math.floor( Math.random() * (2400 + 1 - (-2400)) ) + (-2400) ;
            var ball = $('<div class="ball" style="color:#fff;position:absolute; font-size: 2rem;">●</div>');
            ball.css('left','0');
            ball.css('top',cap.height());
            $('body').append(ball);
            ball.animate({  
                'left' : x,
                'top' : y,
            },  
            {
                duration: 5000,
                queue: false
            })
        }
    }
    if(myPosition == 'right'){
        var cap = $('.top-left');
        for(var i = 0;i < rand;i++){
            var x = Math.floor( Math.random() * (5000 + 1 - 4000) ) + 4000 ;
            var y = Math.floor( Math.random() * (2400 + 1 - (-2400)) ) + (-2400) ;
            console.log('i:' + i + ' x:' + x +' y:' + y);
            var ball = $('<div class="ball" style="color:#fff;position:absolute;">●</div>');
            ball.css('right','0');
            ball.css('top',cap.height());
            $('body').append(ball);
            ball.animate({  
                'right' : x,
                'top' : y,
            },  
            {
                duration: 5000,
                queue: false
            })
        }
    }
    
}

/*パピコを割る*/
function papicoBreak(){
    console.log('break');
    splash();
    removeAcceleraionEventListener();　//加速度センサーを停止
    switch(myPosition){
        case 'right': //相手のパピコを反対側へ移動させてから消す
            papicoRight.animate({  
                'margin-right' : -100
            },  
            {
                duration: 200,
                queue: false
            })
            papicoLeft.animate({  
                'margin-right' : +100
            },  
            {  
                duration: 200,
                queue: false,
                //complete: papicoRight.css('overflow','hidden')
            });
            break;
        case 'left':
            papicoLeft.animate({  
                'margin-left' : -100
            },  
            {
                duration: 200,
                queue: false  
            })
            papicoRight.animate({
                'margin-left' : +100
            },  
            {  
                duration: 200,
                queue: false,
                complete: setTimeout('rightPapicoMove()',1000)
            })
            break;
    }
    //setTimeout('papicoReady()', 5000);
    papicoReady();
}

/*加速度のチェック*/
var checkAcceleraion = function(event){
    if(event.acceleration.x > 6){
        event.acceleration.x = 0;
        websocket.stopReceive();
        papicoBreak(); //パピコを割る
        websocket.broken('broken');
    }
}

/*加速度センサーを停止させる関数*/
function removeAcceleraionEventListener(){
    window.removeEventListener("devicemotion", checkAcceleraion);
}
// This is a JavaScript file

$(function($) {

    /** インジケータ表示範囲を管理するコントローラ */
    var indicatorController = {
                    
        __name: 'indicatorController',
        
        /** インジケータ表示ボタン押下イベント */
        '.complete-btn click': function(){
            alert("aaa")            
            //インジケータ表示
            var indicator = this.indicator({
                message: 'block'
            }).show();
                            
            setTimeout(function() {
                            
                //インジケータ除去
                indicator.hide();
            
            }, 800);
        }
    };
    (function(){ h5.core.controller('body', indicatorController)});
});
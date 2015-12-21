
define(['jquery','Util', 'hdb', 'js/eventTarget', 'text!module/index/clientIntro.tpl'], function($,Util, Handlebars,EventTarget, tpl){

    var objClass = function(options){
        EventTarget.call(this);
        this.options = options;
        setTimeout($.proxy(function(){
            this.$el = $(this.options.el);
        }, this), 100);
        
    }
    
    $.extend(objClass.prototype, EventTarget.prototype, {
        constructor:objClass,
        template:Handlebars.compile(tpl),
        update:function(data){
            this.$el.html(this.template(data));
            /*
            var $userStar = $('.userStar', this.$el);
            var $stars = $('.star', $userStar);
            $star.removeClass('starCur');
            var starLevel = data.starLevel;
            for (var i = 0; i < $this.attr('starLevel'); i++) {
             $('.userStar .star').eq(i).addClass('starCur');
            };
            */
            
            /*
            //切换渠道icon
            var channelId = $this.attr('channel');
            $('.typesTool span').removeClass('appCur');
            if (channelId === '1') {
             $('.typesTool .sms').addClass('appCur');
            }else if(channelId === '2'){
             $('.typesTool .weixin').addClass('appCur');
            }else if(channelId === '3'){
             $('.typesTool .weibo').addClass('appCur');
            }else if(channelId === '4'){
             $('.typesTool .feixin').addClass('appCur');
            }else if(channelId === '5'){
             $('.typesTool .email').addClass('appCur');
            }
            */
        }, 
    });
    
    return objClass;
});

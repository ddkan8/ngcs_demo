define(['Util', 'text!module/index/clientIntro.tpl'], function(Util, tpl){

    var objClass = function(options){
        Util.eventTarget.call(this);
        this.options = options;
        this.$el = $(this.options.el);
        this.eventInit();
    },
    serviceTS = 0;
    
    $.extend(objClass.prototype, Util.eventTarget.prototype, {
        constructor:objClass,
        template:Util.hdb.compile(tpl),
        eventInit:function(){
            this.$el.on('click', '.info .moreInfo', $.proxy(this.moreInfo, this));
            //收缩侧栏
            this.$el.on('click','.leftSc', function(){
                if ($("#content .content .nav").width() == '50') {
                    $("#content .content .nav").animate({width:"245px"},100);
                    $(".chatWarp .content .chatLeft .items .msgCont").animate({width:"530px"},100);
                    $(".chatBox").animate({width:"706px"},100);
                    $(".leftSc").removeClass("sc2");
                    //交谈框自适应
                    $("div.edui-editor.edui-default").width("auto");
                }else{
                    $("#content .content .nav").animate({width:"50px"},100);
                    $(".chatWarp .content .chatLeft .items .msgCont").animate({width:"740px"},100);
                    $(".chatBox").animate({width:"901px"},100);
                    $(".leftSc").addClass("sc2");
                    //交谈框自适应
                    $("div.edui-editor.edui-default").width("auto");
                }
            });
            //进入系统后的计时器
            setInterval($.proxy(function(){
                serviceTS = serviceTS + 1;
                var dstr = secondsFormatStr(serviceTS);
                this.$el.find(".serviceT > span").text(dstr);
            },this),1000);
        },
        moreInfo:function(e){
            this.trigger('moreInfo', e);
        },
        update:function(data){
            this.$el.html(this.template(data));
        }, 
    });

    //工作时间
    var secondsFormatStr = function (seconds, guide) { 
        guide = guide || seconds;
        var s = Math.floor(seconds % 60),
        m = Math.floor(seconds / 60 % 60),
        h = Math.floor(seconds / 3600),
        gm = Math.floor(guide / 60 % 60),
        gh = Math.floor(guide / 3600);
        h = (h > 0 || gh > 0) ? h + ":" : "00:";            
        m = m > 0 ? ((m < 10 ? "0" + m : m) + ":") : "00:";     
        s = (s < 10) ? "0" + s : s;         
        return h + m + s;
    }
    
    return objClass;
});

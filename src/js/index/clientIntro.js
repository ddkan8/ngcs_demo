
define(['jquery','Util', 'hdb', 'js/eventTarget', 'text!module/index/clientIntro.tpl'], function($,Util, Handlebars,EventTarget, tpl){

    var objClass = function(options){
        EventTarget.call(this);
        this.options = options;
        this.$el = $(this.options.el);
        setTimeout($.proxy(function(){
            this.$el = $(this.options.el);
            this.eventInit();
        }, this), 100);
        
    }
    
    $.extend(objClass.prototype, EventTarget.prototype, {
        constructor:objClass,
        template:Handlebars.compile(tpl),
        eventInit:function(){
            //this.$el.on('')
        },
        update:function(data){
            this.$el.html(this.template(data));
        }, 
    });
    
    return objClass;
});

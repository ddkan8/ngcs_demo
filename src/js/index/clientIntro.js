
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
        }, 
    });
    
    return objClass;
});

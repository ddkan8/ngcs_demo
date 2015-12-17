
define(['jquery', 'hdb', 'js/eventTarget', 'text!module/index/popLayoutWaep.tpl'], function($, Handlebars,EventTarget, tpl){

    var objClass = function(options){
        EventTarget.call(this);
        this.options = options;
        setTimeout($.proxy(function(){
            //this.fire('initialize');
            this.$el = $(this.options.el);
            this.$menu = $(this.template(this.options));
            this.eventInit();
        }, this), 10);
        
    }

    $.extend(objClass.prototype, EventTarget.prototype, {
        //constructor: objClass
        template:Handlebars.compile(tpl),
        eventInit:function(){
            //$('.layout .menu .callOut', this.el).on('mouseenter', $.proxy(this.menuInit, this));
            this.$el.on('mouseenter', $.proxy(this.showMenu, this));
            this.$el.on('mouseleave', $.proxy(this.hideMenu, this));
            this.$menu.on('mouseleave', $.proxy(this.hideMenu, this));
            this.$menu.on('click', 'ul>li', $.proxy(this.menuItemCallback, this));
        }, 
        menuItemCallback:function(e){
            var $src = $(e.currentTarget);
            var index = $src.index();
            if (this.options && this.options.menus.length){
                var menuJson = this.options.menus[index];
                if (menuJson && menuJson.click){
                    menuJson.click(e);
                }
            }
        },
        hideMenu:function(e){
            var targetClassName = (e.toElement && e.toElement.className) || 
                (e.relatedTarget && e.relatedTarget.className) || 'nothing';
            if (!this.$menu.hasClass(targetClassName)){
                this.$menu.hide();
            }
            
        },
        showMenu:function(){
            var position = this.$el.position();
            var elHeight = this.$el.height();
            this.$menu.show();
            this.$menu.css({
                left:position.left, 
                top:position.top+elHeight
            });
            if (!this.menuInited){
                $('body').append(this.$menu);
                this.menuInited = 1;
            }
            
        }
    });

    return objClass;
});

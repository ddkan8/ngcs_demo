
/*
功能：
    在页面上显示客户列表
参数：
    el 要绑定到页面上的dom节点选择器
事件：
    itemClick 话务员点击客户列表中客户时触发（列表首次初始化，默认触发）
方法：
    
属性：
    
*/
define(['Util', 'text!module/index/client.tpl'], function(Util, tpl){

    var objClass = function(options){
        Util.eventTarget.call(this);
        this.options = options;
        setTimeout($.proxy(function(){
            // console.log(tpl)
            this.$el = $(this.options.el);
            this.eventInit();
            this.listInit();
        }, this), 100);
        
    }
    
    $.extend(objClass.prototype, Util.eventTarget.prototype, {
        constructor:objClass, 
        template:Util.hdb.compile(tpl),
        eventInit:function(){
            this.$el.on('click','#J_clientList .panel', $.proxy(function(e){
                var $src = $(e.currentTarget);
                var index = $src.parents('.panel').index();
                //{ e:e, data:data} 
                var $src = $(e.currentTarget);
                var index = $src.index();
                if (index<0){
                    index = 0;
                }
                var data = this.json.beans[index];
                this.trigger('itemClick', e, data,index);
                var $msgInfo = $src.find('.msgInfo');
                $msgInfo.addClass("select").parents(".panel").siblings().find(".msgInfo").removeClass("select");
                $msgInfo.find(".bubble").hide();
            },this));
            
        }, 
        listInit:function(){
            Util.svMap.add('clientInfo','clientInfo.json','');
            Util.ajax.postJsonAsync(Util.svMap.get('clientInfo'),'',$.proxy(function(json,status){
                this.json = json;
                if (status) {
                    this.$el.html(this.template(json));
                }else{
                    console.log('客户列表初始化失败.')
                }
                if (json && json.beans && json.beans.length){
                    var itemData = json.beans[0];
                    
                    this.trigger('itemClick', {}, itemData, 0);
                }
            }, this));
        }
    });
    
    Util.hdb.registerHelper('_channel', function(channelNo) {
        return { '1':'sms','2':'weixin','3':'weibo','4':'feixin','5':'email' }[channelNo];
    });

    return objClass;
});

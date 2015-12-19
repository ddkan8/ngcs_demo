
define(['Util', 'text!module/index/client.tpl'], function(Util, tpl){

    var objClass = function(options){
        
        Util.eventTarget.call(this);
        this.options = options;
        setTimeout($.proxy(function(){
            console.log(tpl)
            this.$el = $(this.options.el);
            this.eventInit();
            this.listInit();
        }, this), 100);
        
    }
    
    $.extend(objClass.prototype, Util.eventTarget.prototype, {
        constructor:objClass, 
        template:Util.hdb.compile(tpl),
        eventInit:function(){
            this.$el.on('click','#J_clientList>.panel', $.proxy(function(e){
                var $src = $(e.currentTarget);
                var index = $src.index();
                var data = this.json.beans[index];
                //{ e:e, data:data} 
                this.trigger('itemClick', e, data);
            },this));
        }, 
        listInit:function(){
            Util.svMap.add('clientInfo','clientInfo.json','');
            Util.ajax.postJsonAsync(Util.svMap.get('clientInfo'),'',$.proxy(function(json,status){
                this.json = json;
                if (status) {
                    this.$el.html(this.template(json));
                }else{
                    //console.log('trigger error.')
                }
            }, this));
        }
    });
    
    Util.hdb.registerHelper('_channel', function(channelNo) {
        return { '1':'sms','2':'weixin','3':'weibo','4':'feixin','5':'email' }[channelNo];
    });

    return objClass;
});

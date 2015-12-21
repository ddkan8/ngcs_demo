
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
        this.$el = $(this.options.el);
        this.listInit();
        this.eventInit();
    }
    var seeHistory;
    
    $.extend(objClass.prototype, Util.eventTarget.prototype, {
        constructor:objClass, 
        template:Util.hdb.compile(tpl),
        eventInit:function(){
            this.$el.on('click','#J_clientList .panel', $.proxy(function(e){
                var $src = $(e.currentTarget);
                var index = $src.index();
                var data = this.json.beans[index];
                this.trigger('itemClick', e, data,index);
                var $msgInfo = $src.find('.msgInfo');
                $msgInfo.addClass("select").parents(".panel").siblings().find(".msgInfo").removeClass("select");
                //$msgInfo.find(".bubble").hide();
            },this));


            //点击下一个请求
            this.$el.on('click', ".tirggerRequest", $.proxy(function(e){
                var time = [];
                this.$el.find("#J_clientList .panel .msgInfo .message h1 span").each(function(index, element) {
                    var $this = $(this);
                    var text = $this.text();
                    var str = text.split(":");
                    var minutes = parseInt(str[0]);
                    var seconds = parseInt(str[1]);
                    var date = new Date();
                    var odd = new Date(date.getYear(),date.getMonth(),date.getDay(),date.getHours(),minutes,seconds);
                    time.push(odd.getTime());
                });
                var nextIndex = 0;
                var temp = time[0];
                for(var i=1;i<time.length;i++){
                    if(temp<time[i]){
                        temp = time[i];
                        nextIndex = i;
                    }
                }
                nextIndex = nextIndex+2;
                this.$el.find('#J_clientList .panel').eq(nextIndex).click();
            },this))

            //查看历史
            this.$el.on("click", ".seeHistory", function(){
                 seeHistory = new ucd.PopWin({
                     title: '查看历史',
                     isMode:true,
                     isHandFlex:false,
                     closeAction:"hide",
                     width:925,
                     loadType:"ajax",
                     url:"pages/popwin/seeHistory.html",
                     btns:'<a class="grayBtn" href="javascript:void(0);"><span><b>关闭</b></span></a>',
                     callback:function(){
                         var self = this;
                         self.$dom.delegate(".popWin .closeBtn, .popWin .buttons .greenBtn, .popWin .buttons .grayBtn","click",function(){
                             self.remove();
                         });
                     }
                 });
                 seeHistory.show();
            });
        }, 
        listInit:function(){
            Util.svMap.add('clientInfo','clientInfo.json','');
            Util.ajax.postJson(Util.svMap.get('clientInfo'),'',$.proxy(function(json,status){
                this.json = json;
                if (status) {
                    this.$el.html(this.template(json));
                    if (json && json.beans && json.beans.length){
                        var itemData = json.beans[0];
                        this.trigger('itemClick', {}, itemData, 0);
                        $('#J_clientList>.panel').eq(0).find('.msgInfo').addClass("select");
                        Util.busiComm.interSetTime(0,this.$el);
                    }
                }else{
                    console.log('客户列表初始化失败.')
                }
            }, this));
        }
    });

    Util.hdb.registerHelper('_channel', function(channelNo) {
        return { '1':'sms','2':'weixin','3':'weibo','4':'feixin','5':'email' }[channelNo];
    });

    return objClass;
});


/*
功能：
    创建一个选项卡组 面板集合 对象
参数：
    el 要绑定到页面上的dom节点选择器
事件：
    
方法：
    createChartWrap 创建一个面板（选项卡组）
    showChartWrap 显示已经存在的面板
        参数 phoneNum客户手机号码
    createTab 在当前选项卡组中，新建一个选项卡
        参数 title选项卡标题；url选项卡加载的模块
    hasPanel 是否有该面版
        参数 phoneNum客户电话号码
属性：
    
*/
define(['Util', 'text!module/index/client.tpl'], function(Util, tpl){

    var objClass = function(options){
        Util.eventTarget.call(this);
        this.options = options;
        $.extend(this.options._index, {
            main:this
        })
        this.$el = $(this.options.el);
        this.clientPanels = {}
        //获取tab页签信息
        Util.svMap.add('tab','tab.json','');
        //获取当前聊天客户
        Util.ajax.getJsonAsync(Util.svMap.get('tab'),'',$.proxy(function(json,status){
            if (status) {
                this.tabsJSON = json;
            };
        },this));
        //this.listInit();
        //this.eventInit();
    }
    
    $.extend(objClass.prototype, Util.eventTarget.prototype, {
        template:Util.hdb.compile(tpl),
        eventInit:function(){
            /*
            this.$el.on('click','#J_clientList .panel', $.proxy(function(e){
                
            },this));
            */

        }, 
        hasPanel:function(phoneNum){
            return this.clientPanels[phoneNum];
        },
        createTab:function(title, url){
            if (title && url){
                var options = { title:title, url:url || '' }
                var clientPanel = this.currentPanel;
                var tab = clientPanel.glbTab.createTab(options);
                tab.show();
            }else{
                console.log('tab create fail.');
            }
        },
        hideAllChartWrap:function(){
            $.each(this.clientPanels,function(i, panel){
                if (panel.$chatWarp){
                    panel.$chatWarp.removeClass('show');
                }
            });
        },
        showChartWrap:function(phoneNum){
            this.hideAllChartWrap();
            var clientPanel = this.clientPanels[phoneNum];
            if (clientPanel){
                clientPanel.$chatWarp.addClass("show");
                this.currentPanel = clientPanel;
            }
        },
        createChartWrap:function(data){
            this.hideAllChartWrap();
            var $chatWarp = null;
            var html = '<div class="chatWarp show"><ul class="tab"><li class="trigger"></li></ul>';
                html+='<div class="tabsCont"><div class="tabs"></div></div></div>';
            $chatWarp = $(html);
            $chatWarp.appendTo(this.$el);
            //"#tabs_"+index
            this.currentPanel = this.clientPanels[data.phoneNum] = {
                $chatWarp:$chatWarp,
                glbTab:new Util.tabs({ container:$chatWarp.find('.tabs'), data:this.tabsJSON, 
                    _index:this.options._index })
            }
            //glbTab.chatWarpIndex = index;
            //glbTabArr.push(glbTab);


        }
    });

    return objClass;
});


/*

var $chatWarp = $("#chatWarpContainer .chatWarp[dec='"+index+"']");
window.chatWarpIndex = index;

if($chatWarp.length > 0){
    $chatWarp.addClass("show");
    for(var i=0;i<glbTabArr.length;i++){
        if(glbTabArr[i].chatWarpIndex == index){
            glbTab = glbTabArr[i];
            break;
        }
    }
    $chatWarp.siblings().removeClass("show");
    if(index != 1){
        $(".navText ul").hide();
    }else{
        $(".navText ul").show();
    }
    return;
}else{
    var html = '<div class="chatWarp show" dec="'+index+'"><ul class="tab"><li class="trigger"></li></ul>';
        html+='<div class="tabsCont"><div id="tabs_'+index+'" class="tabs"></div></div></div>';
        $chatWarp = $(html).appendTo($("#chatWarpContainer"));
        glbTab = new Util.tabs({container:"#tabs_"+index,data:tabDefaultData});
        glbTab.chatWarpIndex = index;
        glbTabArr.push(glbTab);
}
$chatWarp.siblings().removeClass("show");
$chatWarp.find(".chatLeft .items > .warp").html("");//清空聊天区域
*/
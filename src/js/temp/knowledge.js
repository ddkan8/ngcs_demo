define(function(){
    var $el = $('<div><span>this is knowledge page.</span><input type="button" value="new tab" /></div>');
    
    /*
    功能：
        该方法初始化回调函数，每个业务模块都需有这个函数，用来接收框架信息
    参数：
        index 框架页对象，从它这里可以访问到框架各子模块
            client 左侧客户列表
            clientIntro 右上角客户信息介绍
            main 右侧选项卡组的容器
    返回：
        必需为jquery dom对象，框架会将此dom添加到选项卡内容区域
    */
    var initialize = function(index){
        $el.on('click', 'input', function(e){
            console.log(index.main)
            index.main.createTab('businessTab', 'js/temp/knowledge');
        });

        this.content = $el;
        return $el;
    }
    return initialize;
    //return { content:$el }
});
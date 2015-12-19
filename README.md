# ngcs_demo
ngcs

框架页所用到的模块介绍：

头部
    弹出菜单 js/index/popLayoutWaep.js
        功能：
        参数：
            el 指定一个选择器
            menus 定义菜单项
                text 菜单项文本
                click 点击菜单时的处理程序
        示例：
            require(['js/index/popLayoutWaep'], function(Waep){
                var busyMenu = new Waep({
                    el:'.layout .menu .busy', 
                    menus:[
                        { text:'休息', click:function(e){ console.log('pause') } }, 
                        { text:'整理延长', click:function(e){ console.log('extend') } }, 
                        { text:'签出', click:function(e){ console.log('checkOut') } }, 
                    ]
                });
            })

define(['Util', 'text!module/index/topMenu.tpl', 'text!module/index/userInfo.tpl'], function(Util, topMenu,userInfo){
	var loadTopNav = function(glbTabObj){
		/*
			@param1: 服务名
			@param2: 模拟数据服务地址
			@param3: 真实后台服务地址
			desc:动态添加ajax服务地址，
		*/
		Util.svMap.add('topMenu','topMenu.json','');
		//ajax请求，详细注释见ajax_amd.js
		//全局菜单
		Util.ajax.postJson(Util.svMap.get('topMenu'),'aaa=111',function(json,status){
			if (status) {
				var template = Util.hdb.compile(topMenu);//handlebars模板编译
				Util.tips({
					container:$("#menu1"),
					dataType:"url",
					action:'click',
					content:template(json)	//handlebars模板数据渲染
				});
				//左边菜单切换
				$(".topNavMenu li").hover(function(e){
					$(this).addClass("selected").siblings().removeClass("selected");
					var index = $(this).index();
					$(".navRightMenu .menuItem").eq(index).show().siblings().hide();
					//e.stopPropagation();
				}).eq(0).addClass('selected');
				$(".navRightMenu .menuItem").eq(0).show();
				//点击全局菜单的二级菜单添加标签页
				$(".shortBox .subMenu dl dd a").on("click",function(e){
					$(this).parents(".popLayoutWaep").hide();
					Util.busiComm.switchTab($(this).text(),'',glbTabObj);
					e.stopPropagation();
				});
				//按钮失去焦点显示的文字
				Util.busiComm.bindInpEvent($(".navLeftMenu .sBtn input"),"搜索菜单");
				//防止冒泡
				$(".navLeftMenu .sBtn input").on('click', function(e){
					e.stopPropagation();
				})
			};
		})

		//用户信息pop
		Util.ajax.postJson(Util.svMap.get('topMenu'),'aaa=111',function(json,status){
			if (status) {
				var template = Util.hdb.compile(userInfo);//handlebars模板编译
				Util.tips({
					container:$(".userName"),
					dataType:"url",
					content:template(json)	//handlebars模板数据渲染
				});


				//样式切换
				$(".myPerform li").click(function(){
					//$(this).addClass("selected").siblings().removeClass("selected");
					Util.busiComm.switchTab($(this).text(),'',glbTabObj);
				});
		        $(".tempType li").on("click",function(){
		            var index = $(this).index();
		            $(".tempType li").removeClass("hover");
		            $(this).addClass("hover");
		            if(index == 1){
						$("#content>.layout>.content.pd17").hide(0).eq(1).show(0);
						/*$("#content").addClass("bigLayout");
						$("#content .nav").hide(0);
						$("#content .section .panel:first").hide(0);*/
					}else if(index == 2){
						$("#content>.layout>.content.pd17").hide(0).eq(2).show(0);
						/*$("#content .nav").show(0);
						$("#content .section .panel:first").show(0);*/
					}else{
						$("#content>.layout>.content.pd17").hide(0).eq(0).show(0);
						/*$("#content .nav").hide(0);
						$("#content .section .panel:first").show(0);*/
					}
		        });
			};
		})
	}

	return loadTopNav;
})
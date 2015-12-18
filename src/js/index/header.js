define(['Util', 'text!module/index/topMenu.tpl', 'text!module/index/userInfo.tpl'], function(Util, topMenu,userInfo){
	var loadTopNav = function(glbTabObj, keyword){
		/*
			@param1: 服务名
			@param2: 模拟数据服务地址
			@param3: 真实后台服务地址
			desc:动态添加ajax服务地址，
		*/
		Util.svMap.add('topMenu','topMenu.json','');
		//ajax请求，详细注释见ajax_amd.js
		//全局菜单
		Util.ajax.postJson(Util.svMap.get('topMenu'), keyword?'keyword='+keyword:'', function(json,status){
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
				//按钮失去焦点显示的文字
				Util.busiComm.bindInpEvent($(".navLeftMenu .sBtn input"),"搜索菜单");
				//点击全局菜单的二级菜单添加标签页
				$(".shortBox .subMenu dl dd a").off('click').on("click",function(e){
					$(this).parents(".popLayoutWaep").hide();
					Util.busiComm.switchTab($(this).text(),'',glbTabObj);
					e.stopPropagation();
				});
				//防止冒泡
				$(".navLeftMenu .sBtn input").off('click').on('click', function(e){
					e.stopPropagation();
				})
				//搜索菜单
				$('#J_searchMenu_btn').off('click').on('click', function(){
					var keyword = $('#J_memu_key').val();
					loadTopNav(glbTabObj, keyword);
				})
			};
		})
	}
	//用户中心
	var userCenter = function(){
		Util.svMap.add('userCenter','userCenter.json','');
		//用户信息pop
		Util.ajax.postJson(Util.svMap.get('userCenter'),'aaa=111',function(json,status){
			if (status) {
				$('#J_userName').text(json.bean.name);
				$('#J_userId').text(json.bean.id);
				var template = Util.hdb.compile(userInfo);//handlebars模板编译
				Util.tips({
					container:$(".userName"),
					dataType:"url",
					content:template(json.bean)	//handlebars模板数据渲染
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

	var notice = function(glbTabObj){

		Util.svMap.add('notice','notice.json','');
		Util.ajax.postJson(Util.svMap.get('notice'), '', function(json,status){
			if (status) {
				var noticeWrap = $(".tools .entertainingDiversions");
				noticeWrap.find('.txt').text(json.beans[0]['text']);
				//公告
				noticeWrap.bind("play",function(){
					var $txt = $(this).find(".txt"),
						$this = $(this),
						tw = $txt.width(),
						iw = $this.innerWidth();
					if(tw<=iw)return;
					$txt.text($txt.text()+$txt.text());
					window.entertainingDiversionsTime = setInterval(function(){
						var lef = parseInt($txt.css("margin-left"),10);
						lef -= 1;
						if(Math.abs(lef)>= tw){
							lef = 0;
						}
						$txt.css("margin-left",lef+"px");
					},60);
				}).bind("stop",function(){
					clearInterval(window.entertainingDiversionsTime);
				});
				noticeWrap.trigger("play");
				noticeWrap.click(function(){
					Util.busiComm.switchTab("公告", '', glbTabObj);
				});
			}
		})
	}
	//知识搜索
	var searchKnowledge = function(glbTabObj){
		Util.busiComm.bindInpEvent($(".search > input"),"搜索知识");
		
		//搜索知识框按钮
		$("#search_knowledge").on('click', function(){
			var $box = $('.layout .menu .search .normal');
			console.log($box.val());
			Util.busiComm.switchTab("搜索知识","js/temp/knowledge", glbTabObj);
		})
	}


	return function(glbTabObj, keyword){
		loadTopNav(glbTabObj, keyword);
		userCenter();
		notice(glbTabObj);
		searchKnowledge(glbTabObj);

		Util.tips({
			container:$(".checkOut")[0],
			content:'<ul class="toolMen ch1"><li><a href="">休息</a></li><li><a href="">整理延长</a></li><li><a href="">签出</a></li></ul>'
		});
		Util.tips({
			container:$(".checkOut")[1],
			content:'<ul class="toolMen ch2"><li><a href="">微博</a></li><li><a href="">邮件</a></li><li><a href="">短信</a></li></ul>'
		});
	};
})
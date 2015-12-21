define(['Util','js/index/header'],function (Util,header) {

	//创建tab标签
	var glbTab, glbTabArr = [], tabDefaultData, serviceTS = 0;
	var client = null, clientIntro=null;

	$(function(){
		//获取tab页签信息
		Util.svMap.add('tab','tab.json','');
		//获取当前聊天客户
		Util.ajax.getJsonAsync(Util.svMap.get('tab'),'',function(json,status){
			if (status) {
				tabDefaultData = json;
			};
		})

		//客户列表
		require(['js/index/client'], function(Client){
			client = new Client({
				el:'.layout .nav'
			});
			client.on('itemClick', function(e, data, index){
				clientIntro.update(data);
				createChartWrap(index);//创建聊天面板
			});
		});
		//客户介绍 
		require(['js/index/clientIntro'], function(Intro){
			if (!clientIntro){
				clientIntro = new Intro({
					el:'.layout .section .clientInfo .userInfoCont'
				});
			}
			
		});
		
		header(glbTab);//加载菜单

		//微博渠道加关注
		$("#content").on("click.weibo",".typesTool .weibo",function(){
			$("#weiboAttention").css({top:$(this).offset().top+24+"px",left:$(this).offset().left-$("#weiboAttention").outerWidth(true)/2+9+"px"}).show(0)
			.unbind("mouseleave").bind("mouseleave",function(){
				$(this).hide(0);
			});
		});
		$("#weiboAttention").on("click.weibo",".btnsCon .greenBtn",function(){
			$("#weiboAttention").hide(0);
		});

		//demo
		$("#content .nav > .panel:eq(2)").hide();
		window.setTimeout(function(){
			var $panel = $("#content .nav > .panel:eq(2)");
			$panel.find(".msgInfo .message h1 span").hide();
			$panel.addClass("noneBg").fadeIn(1500,function(){
				$panel.find(".msgInfo .message h1 span").text("00:00").show();
				Util.busiComm.interSetTime(0);
				var $icon = $panel.find(".feixin");
				window.firstPush = window.setInterval(function(){
					$icon.toggleClass("fade");
				},500);
				$panel.removeClass("noneBg")
			});
		},3000);

		// Util.busiComm.interSetTime(0);

	})

	

	//休息与微博弹出菜单
	var popupLayoutMenuInit = function(){
		require(['js/index/popLayoutWaep'], function(Waep){
			var busyMenu = new Waep({
				el:'.layout .menu .busy', 
				menus:[
					{ text:'休息', click:function(e){ console.log('pause') } }, 
					{ text:'整理延长', click:function(e){ console.log('extend') } }, 
					{ text:'签出', click:function(e){ console.log('checkOut') } }, 
				]
			});
			var callOutMenu = new Waep({
				el:'.layout .menu .callOut', 
				menus:[
					{ text:'微博1', click:function(e){ console.log('mic blog') } }, 
					{ text:'邮件', click:function(e){ console.log('mail') } }, 
					{ text:'短信', click:function(e){ console.log('msg') } }, 
				]
			});
			callOutMenu.addListener('initialize', function(){
				console.log('initialized...')
			});
		});
	}

	//创建选择的客户对应的业务面板
	function createChartWrap(index){
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
		//等待tab生成
		window.setTimeout(function(){
			$.getScript("src/assets/data/msg"+index+".js",function(d){
				var data = eval(d);
				$.each(data,function(i,o){
					createMsgItem(o,i,$chatWarp);
				});
				line($chatWarp);
				
				//更新滚动条
				var $items = $chatWarp.find(".chatLeft .items");
				$items.css({'height':245});
				$items.css({'max-height':245,"overflow":"hidden"});
				nicesx = Util.busiComm.createScroll($items);


				createUe($(this).parents(".msgCont"),$(this));	

				//演示使用
				if(index == 3){				
					//微博渠道--------------------------------------------
					$(".msgCont .cosBox .rep .rePersonalLetter").on("click",function(e){
						e.preventDefault();
						e.stopPropagation();
						if(!$(this).hasClass("repM")){
							$(".msgCont .cosBox .rep .comment").removeClass("repM");
							$(this).addClass("repM");
							createUe($(this).parents(".msgCont"),$(this));	
						}else{
							removeUe();
							$(this).removeClass("repM");
						}
					});
					$chatWarp.find(".chatBox").hide();
					//---------------------------------------
				}
			});
		},300);
	}

	//回复时间获取函数
	function getRepTime(){
		function formatDoubleDigit(number){//格式为两位数
			return number<10?"0"+number:number;
		}
		var time = new Date();
		return formatDoubleDigit(time.getHours()) + ":" + formatDoubleDigit(time.getMinutes()) +":"+ formatDoubleDigit(time.getSeconds());
	}
	/*转换内容中的图片代号*/
	function msgRe(s){
		for(var i = 0 ; i < 21/*代表有21种替换表情*/ ; i++){
			var st = "&img"+(i+1)+";";
			var reg = new RegExp(st);
			s = s.replace(reg,'<img src="resources/default/images/qq/'+(i+1)+'.gif"/>');
		}
		return s;
	}
	//客服人员回复内容
	function createItemRep(o){
		var s = msgRe(o.msg);
		var repStr = [];
			repStr.push('<div desc-type="'+o.type+'" class="repItem"><div class="msgCont"><div class="gosBox"><div class="gosBoxTop"><div class="gosBoxTopRight"><div class="gosBoxTopCenter"></div></div></div><div class="gosBoxMid"><div class="gosBoxMidRight"><div class="gosBoxMidCenter">');
			repStr.push('<div>'+s+'</div>');
			if(o.type == "weibo"){
				itemStr.push('<div class="rep"><span class="forward">转发 '+o.forward+'</span><span class="line"></span><span class="comment"><span class="repCenter">评论 <i>'+o.comment+'</i></span></span><a href="#" class="rePersonalLetter"><span class="repCenter">回私信</span></a></div>');
			}
			repStr.push('</div></div></div><div class="gosBoxButtom"><div class="gosBoxButtomRight"><div class="gosBoxButtomCenter"></div></div></div></div></div>');
			repStr.push('<div class="icon"><div class="msgType"><span class="type '+o.type+'"></span></div><p class="time">'+/*o.time*/getRepTime()+'</p></div></div>');
		return repStr.join("");
	}
	//--用户发送内容
	function createItem(o){
		var s = msgRe(o.msg);
		var repStr = [];
		var itemStr = [];
			itemStr.push('<div desc-type="'+o.type+'" class="item"><div class="line"><div class="icon"><div class="msgType"><span class="type '+o.type+'"></span></div><p class="time">'+/*o.time*/getRepTime()+'</p></div><div class="msgCont"><div class="cosBox"><div class="trangle"></div><div class="cosBoxTop"><div class="cosBoxTopRight"><div class="cosBoxTopCenter"></div></div></div>');
	        itemStr.push('<div class="cosBoxMid"><div class="cosBoxMidRight"><div class="cosBoxMidCenter">');
	        o.name&&itemStr.push('<h1><span class="name">'+o.name+'</span></h1>');
	        itemStr.push('<div>'+s+'</div>');
	        if(o.type == "weibo"){
				itemStr.push('<div class="rep"><span class="forward">转发 '+o.forward+'</span><span class="line"></span><span class="comment"><span class="repCenter">评论 <i>'+o.comment+'</i></span></span><a href="#" class="rePersonalLetter"><span class="repCenter">回私信</span></a></div>');
				var reps = o.reps;
				var l = reps ? reps.length : 0;
				if(l > 0){
					for(var i = 0 ; i < l ; i++){
						var oo = reps[i];
						var ss= msgRe(oo.msg);
						repStr.push('<div class="cosBox repCosBox"><div class="cosBoxTop"><div class="cosBoxTopRight"><div class="cosBoxTopCenter"></div></div></div><div class="cosBoxMid"><div class="cosBoxMidRight"><div class="cosBoxMidCenter"><div>'+ss+'</div><div class="rep"><span class="forward">转发 '+oo.forward+'</span><span class="line"></span><span class="comment"><span class="repCenter">评论 '+oo.comment+'</span></span></div></div></div></div><div class="cosBoxButtom"><div class="cosBoxButtomRight"><div class="cosBoxButtomCenter"></div></div></div></div>');
					}
				}
			}
	        itemStr.push('</div></div></div><div class="cosBoxButtom"><div class="cosBoxButtomRight"><div class="cosBoxButtomCenter"></div></div></div></div>');
			itemStr.push(repStr.join(""));
			itemStr.push('</div></div></div>');
		return itemStr.join("");
	}
	/*根据数据创建聊天内容*/
	function createMsgItem(o,i,p){
		var time = o.time;
		var obj = o.cont;
		var t = o.type;
		var str = '';
		if(t == 1){//回复客户内容
			str = createItemRep(obj);
		}else if(t == 0){//客户聊天内容
			str = createItem(obj);
		}
		p.find(".chatLeft .items > .warp").append(str);
	}
	//添加边线
	function line(p){
		var $warp = p.find(".chatLeft .items > .warp");
		$warp.find("> div").removeClass("last");
		$warp.find("> div.item").children("div").addClass("line");
		var vLast = $warp.find("> div:visible").last();
		if(vLast.hasClass("item")){
			var icLast = $warp.find("> div.item:visible").last();
			icLast.addClass("last");
			icLast.children(".line").removeClass("line");
			icLast.prev(".repItem").css("background","none");
			var $ls = icLast.prevUntil(".repItem");
			if(!$ls[0]){
				$ls = $warp.find("> div.item:visible");
			}
			$ls.children("div").removeClass("line");
		}else{
			vLast.css("background-color","#fff");
			vLast.prev(".item").css("background-color","#fff");
			vLast.addClass("last");
		}
		$warp.find("> .repItem:visible").eq(0).prevAll(".item").children(".line").removeClass("line");
	}
	//时间闪动
	function fadeTime(obj){
		var text = obj.text();
		if(text == "00:10" && costemerIndex == 0){
			window.interFadeTime = window.setInterval(function(){
				obj.toggle();
			},500);
		}
	}
	//微博回复数据
	var weiboCostemerCount = 0;
	var weiboCostemerMsg = [
		{
			time:"08:16:10:100",
			type:0,
			cont:{time:"08:16",name:'来自 - 王吉',msg:'可以啊，帮我开通办理一下',type:'weibo',comment:0,forward:0}
		},
		{
			time:"08:20:10:100",
			type:0,
			cont:{time:"08:20",name:'来自 - 王吉',msg:'好的，谢谢！',type:'weibo',comment:0,forward:0}
		},
		{
			time:"08:15:10:100",
			type:0,
			cont:{time:"08:25",name:'来自 - 王吉',msg:'谢谢，新套餐很好',type:'weibo',comment:0,forward:0}
		},
	]
	//在当前容器下加入编辑器并绑定发送
	function createUe($warp,$btn){
		//removeUe();
		var $div = $("<div class='weiboUe'/>");
		$warp.append($div);
		$div.load("src/module/index/ue.html",function(){
			//刷新滚动条
			var $chatWarp = $div.parents(".chatWarp");
			var $items = $chatWarp.find(".items");
			nicesx = nicesx&&createScroll($items,"445");
			var nicesxFn = function(){
				var height = $chatWarp.find(".items > .warp").outerHeight(true);
				var $items = $chatWarp.find(".items");
				$items.scrollTop(height);
				nicesx&&nicesx.resize();
			}
			setTimeout(nicesxFn,10);
			
			uec = UE.getEditor("editor_rep");
			var sendBtn = $div.find(".sendBtn");
				sendBtn.click(function(e){
					var msg = uec.getAllHtml();
					var $msgCont = $div.parent().children(":first-child");
					var ss= msgRe(msg);
					var repStr = '<div class="cosBox repCosBox"><div class="cosBoxTop"><div class="cosBoxTopRight"><div class="cosBoxTopCenter"></div></div></div><div class="cosBoxMid"><div class="cosBoxMidRight"><div class="cosBoxMidCenter"><div>'+ss+'</div><div class="rep"><span class="forward">转发 0</span><span class="line"></span><span class="comment"><span class="repCenter">评论 <i>0</i></span></span></div></div></div></div><div class="cosBoxButtom"><div class="cosBoxButtomRight"><div class="cosBoxButtomCenter"></div></div></div></div>';
					$div.parent().append(repStr);
					
					$btn.click();
					setTimeout(function(){
						var o = weiboCostemerMsg[weiboCostemerCount];
						if(!o){
							return;
						}
						weiboCostemerCount++;
						createMsgItem(o,0,$chatWarp);
						line($chatWarp);
						
						setTimeout(nicesxFn,10);
					},1500);
				});
		});
	}
	function removeUe(){
		uec && uec.destroy();
		uec = null;
		$(".weiboUe").remove();
	}
})



/*
setTimeout(function(){
			require(['js/index/client'], function(Client){
				client = new Client({
					el:'.layout .nav', 

				});
				client.on('itemClick', function(e, data){
					userIntro.update(data);
					var $src = $(e.currentTarget);
					var index = $src.index();
					createChartWrap(index);//创建聊天面板
				})
			});
			require(['js/index/userIntro'], function(UserIntro){
				if (!userIntro){
					userIntro = new UserIntro({
						el:'.layout .section .clientInfo', 
					});
				}
				
			});
*/



		//切换聊天客户
		// $("#J_clientList .panel .msgInfo").on('click',function(e){
		// 	var $this = $(this);
		// 	$this.addClass("select").parents(".panel").siblings().find(".msgInfo").removeClass("select");
		// 	$this.find(".bubble").hide();
			
		// 	var _clientInfo = $('.userInfoCont');
		// 	_clientInfo.find('.name').text($this.attr('cName'));
		// 	_clientInfo.find('.account').text($this.attr('phoneNum'));
		// 	_clientInfo.find('.pkgCur').text($this.attr('meal'));
		// 	_clientInfo.find('.userLocal').text($this.attr('region'));
		// 	_clientInfo.find('.feeState').text($this.attr('state'));
		// 	//设置星级
		// 	$('.userStar .star').removeClass('starCur');
		// 	for (var i = 0; i < $this.attr('starLevel'); i++) {
		// 		$('.userStar .star').eq(i).addClass('starCur');
		// 	};
		// 	//切换渠道icon
		// 	var channelId = $this.attr('channel');
		// 	$('.typesTool span').removeClass('appCur');
		// 	if (channelId === '1') {
		// 		$('.typesTool .sms').addClass('appCur');
		// 	}else if(channelId === '2'){
		// 		$('.typesTool .weixin').addClass('appCur');
		// 	}else if(channelId === '3'){
		// 		$('.typesTool .weibo').addClass('appCur');
		// 	}else if(channelId === '4'){
		// 		$('.typesTool .feixin').addClass('appCur');
		// 	}else if(channelId === '5'){
		// 		$('.typesTool .email').addClass('appCur');
		// 	}

		// });


	// var eventInit = function(){
	// 	$("#J_clientList .panel .msgInfo").on('click', clientItemClick);
	// }

	// var clientItemClick = function(e){
	// 	var $this = $(this);
	// 	$this.addClass("select").parents(".panel").siblings().find(".msgInfo").removeClass("select");
	// 	$this.find(".bubble").hide();
		
	// 	var _clientInfo = $('.userInfoCont');
	// 	_clientInfo.find('.name').text($this.attr('cName'));
	// 	_clientInfo.find('.account').text($this.attr('phoneNum'));
	// 	_clientInfo.find('.pkgCur').text($this.attr('meal'));
	// 	_clientInfo.find('.userLocal').text($this.attr('region'));
	// 	_clientInfo.find('.feeState').text($this.attr('state'));
	// 	//设置星级
	// 	$('.userStar .star').removeClass('starCur');
	// 	for (var i = 0; i < $this.attr('starLevel'); i++) {
	// 		$('.userStar .star').eq(i).addClass('starCur');
	// 	};
	// 	//切换渠道icon
	// 	var channelId = $this.attr('channel');
	// 	$('.typesTool span').removeClass('appCur');
	// 	if (channelId === '1') {
	// 		$('.typesTool .sms').addClass('appCur');
	// 	}else if(channelId === '2'){
	// 		$('.typesTool .weixin').addClass('appCur');
	// 	}else if(channelId === '3'){
	// 		$('.typesTool .weibo').addClass('appCur');
	// 	}else if(channelId === '4'){
	// 		$('.typesTool .feixin').addClass('appCur');
	// 	}else if(channelId === '5'){
	// 		$('.typesTool .email').addClass('appCur');
	// 	}

	// 	var index = $this.parents(".panel").index();
	// 	createChartWrap(index);//创建聊天面板
		
	// 	//清除闪动
	// 	if(window.firstPush && index == 0){
	// 		window.clearInterval(window.firstPush);
	// 		$this.find(".feixin").removeClass("fade");
	// 		window.setTimeout(function(){
	// 			$this.find(".feixin").removeClass("fade");
	// 		},500);
	// 	}
	// }

	// var clientListInit = function(){
	// 	//获取客户列表和等待人数
	// 	Util.svMap.add('clientInfo','clientInfo.json','');
	// 	Util.ajax.postJsonAsync(Util.svMap.get('clientInfo'),'',function(json,status){
	// 		if (status) {
	// 			if (json.bean.waitPersonNum) {
	// 				$('.peopleNum strong').text(json.bean.waitPersonNum);//设置等待人数
	// 			}
	// 			var template = Util.hdb.compile($('#T_clientList').html());//handlebars模板编译
	// 			$('#J_clientList').html(template(json.beans));
	// 		}else{
	// 			$('.peopleNum strong').text('0');
	// 		}
	// 	})
	// }

	/* 待删除
	var searchBoxInit = function(){
		$('.layout .menu .searchBox .icon').on('click', function(e){
			Util.ajax.postJson('a.json', {}, function(){
				console.log('111');
			})
		});
	}
	*/



	/*//工作时间
	function secondsFormatStr(seconds, guide) {
		guide = guide || seconds;
		var s = Math.floor(seconds % 60),
		m = Math.floor(seconds / 60 % 60),
		h = Math.floor(seconds / 3600),
		gm = Math.floor(guide / 60 % 60),
		gh = Math.floor(guide / 3600);
		h = (h > 0 || gh > 0) ? h + ":" : "00:";			
		m = m > 0 ? ((m < 10 ? "0" + m : m) + ":") : "00:";		
		s = (s < 10) ? "0" + s : s;			
		return h + m + s;
	}*/
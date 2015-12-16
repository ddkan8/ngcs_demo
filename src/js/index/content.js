define(['Util','text!module/index/content.tpl'], function(Util, content){
	var costemerIndex = 0;
	var costemer;
	$(function(){
		var $chatWarp = $(".chatWarp[dec='"+window.chatWarpIndex+"']");
		if(window.chatWarpIndex != 1){
			$(".navText ul").hide();
		}else{
			$(".navText ul").show();
		}
		//右边菜单栏按钮hover样式
		$("#content .section .userInfoCont .actionItems a").hover(function(e){
			$(this).addClass("hover").siblings().removeClass("hover");
		},function(e){
			$(this).removeClass("hover").siblings().removeClass("hover");
		})
		//点击余额提醒
		$chatWarp.find(".remind").click(function(e){
			switchTab("短信提醒余额");
		});
		//点击未完工单提醒
		$chatWarp.find(".remindOrder").click(function(e){
			switchTab("未完工单提醒");
		});
		//点击反馈提醒
		$chatWarp.find(".feedback").click(function(e){
			switchTab("反馈");
		});
		//点击查看消费记录
		$chatWarp.find(".viewRecord").click(function(e){
			switchTab("查看消费记录");
		});
		//右边业务选项点击
		$chatWarp.find(".content .chatRight h1").click(function(){
			var $self = $(this);		
			var $next = $self.next(".childres");
			var delay = 500;
			$next.slideToggle(delay);
			$self.toggleClass("hide");
		});
		//右边业务 上更多链接点击
		$chatWarp.find(".content .chatRight h1 .more").click(function(e){
			alert("more");
			e.preventDefault();
			e.stopPropagation();
		});	
		//右边业务 逻辑业务中 更多 链接点击处理函数
		function showMore($target){
			var $more = $target.find(".more");
			var $showMore = $target.siblings(".showMore");
			$showMore.slideToggle(500,function(){			
				if($more.hasClass("expend")){
	//				$more.text("更多");
					$more.removeClass("expend");
				}else{
	//				$more.text("收起");
					$more.addClass("expend");
				}
			});	
		}
		//右边业务 逻辑业务中 更多 链接点击
		$chatWarp.find(".content .chatRight .childBar .more").click(function(e){		
			showMore($(this).parent());
			e.preventDefault();
			e.stopPropagation();
		});	
		//点击交谈框上面的li切换样式
		$chatWarp.find(".chatTitle ul li").click(function(e){
			$(this).addClass("on").siblings().removeClass("on");
		})
		//提示关闭按钮
		$chatWarp.find(".tipBar a.close").click(function(){
			$(this).parent().slideUp(500);
		})
		//右边业务列表的li切换样式
		$chatWarp.find(".childres .bussList li").click(function(e){
			$(this).addClass("on").siblings().removeClass("on");
			var index = $(this).index();
			var $items = $(this).parents(".childres").find(".bussItem").eq(index);
			$items.addClass("show").siblings().removeClass("show");
		})
		
		var over = function(e){		
				$(".chatWarp .content .chatRight .childres .expect tr").removeClass("tableHover");
				$(this).addClass("tableHover");	
				var offset = $(this).offset();
				$("#historyList").show();
				var position = {left:offset.left-$("#historyList").outerWidth(true)/2+135,top:offset.top};
				$("#historyList").css(position);				
				/*if($.browser.msie && parseInt($.browser.version,10) < 8){
					$("#content").css({
						"position":"relative",
						"z-index":"-1"	
					});
				}*/
				e.stopPropagation();
				e.preventDefault();	
			}
		var out = function(e){
			/*if($.browser.msie && parseInt($.browser.version,10) < 8){
				$("#content").css({
					"position":"static",
					"z-index":"-1"	
				});
			}	*/
			e.stopPropagation();		
		}
		//历史记录详情单
		$(".date").parent("tr").unbind("mouseenter.historyList").unbind("mouseleave.historyList").bind("mouseenter.historyList",over).bind("mouseleave.historyList",out);
		/*$(".date").parent("tr").bind("mouseenter.historyList",function(){
			$(this).children(".date").trigger("mouseenter.historyList");
		}).bind("mouseleave.historyList",function(){
			$(this).children(".date").trigger("mouseleave.historyList");
		});*/
		$("#historyList").hover(function(e){},function(e){$(this).hide();$(".chatWarp .content .chatRight .childres .expect tr").removeClass("tableHover");});
		//历史记录详情单关闭按钮
		$(".historyList a.close").click(function(e){
			$(this).parents(".historyList").hide();
			e.stopPropagation();
		})	
		$("#editor",$(content)).attr("id","editor_"+window.chatWarpIndex);
		//实例化编辑器
	    var ue = UE.getEditor("editor_"+window.chatWarpIndex);
		
		//自动级联输入
	    ue.addListener('focus',function(e){
	        this.setContent("");
			var text = ue.getContent();
			if(/请问/.test(text)){
				var offset = $("#editor_"+window.chatWarpIndex).offset();
				$(".capacityPrompt").css({top:offset.top+60+"px",left:offset.left+45+"px"}).show(0);
			}else{
				$(".capacityPrompt").hide(0);
			}
	    });
		$(".capacityPrompt",top.document).undelegate("li","mousedown.capacityPrompt").delegate("li","mousedown.capacityPrompt",function(e){
			var text = $(this).text();
			if(text+""){
				ue.setContent(text);
			}
		});
		ue.addListener('blur',function(e){
			setTimeout(function(){
				$(".capacityPrompt").hide(0);
			},100);
	    });
		//加载快捷菜单
		/*var pop8 = new ucd.PopLayout({
			container:$chatWarp.find(".tab li"),
			dataType:"url",
			action:'click',
			content:'pages/tabmenu.html'
		});*/
		//点击 客户轨迹 Iphone5 手机
		$chatWarp.find(".navText .shopping").click(function(e){
			switchTab(" Iphone5 手机","pages/shopping.html");
		})
		//加载微博选择渠道
		/*var popWeiBo = new ucd.PopLayout({
			container:$chatWarp.find(".chatTitle .weiboContainer"),		
			content:'<ul class="toolMen ch2 weiboChoose"><li><a href="javascript:void(0);" class="twitter">Twitter</a></li><li><a href="javascript:void(0);" class="facebook">Facebook</a></li></ul>'
		});	*/
		ue.addListener('keyup',function(e){
			var text = ue.getContent(); 
			if(/请问/.test(text)){
				var offset = $("#editor_"+window.chatWarpIndex).offset();
				$(".capacityPrompt").css({top:offset.top+60+"px",left:offset.left+45+"px"}).show(0);
			}else{
				$(".capacityPrompt").hide(0);
			}
	    });
		//演示使用
		costemerIndexMap = [0,0,0,0,0,0];
		costemer = [{
			time:"08:20:10:100",
			type:0,
			cont:{time:"08:20",name:'',msg:'好的！',type:'feixin'}
		},{
			time:"08:22:10:100",
			type:0,
			cont:{time:"08:22",name:'',msg:'我没有打那么长话，是不是费用扣错了？',type:'feixin'}
		},{
			time:"08:23:10:100",
			type:0,
			cont:{time:"08:23",name:'',msg:'好的，发到我邮箱吧',type:'feixin'}
		},{
			time:"08:24:30:100",
			type:0,
			cont:{time:"08:24",name:'',msg:'已经收到了，是我自己记错了，谢谢您',type:'feixin'}
		},{
			time:"08:26:10:100",
			type:0,
			cont:{time:"08:26",name:'',msg:'没有了，谢谢',type:'feixin'}
		}]
		//如果是微信咨询则微信回复
		/*--------------------------------------------------------------------------------------------------------*/
		if(window.chatWarpIndex == 2){
			$(".shopping span").text("Ascend P1 手机");
		}else{
			$(".shopping span").text("Iphone5 手机");
		}
		if(window.chatWarpIndex == 1)	{
			costemer = [{
				time:"08:16:10:102",
				type:0,
				cont:{time:"08:16",name:'',msg:'我的设置都是正常的，就是看不了网页',type:'weixin'}
			},{
				time:"08:30:10:100",
				type:0,
				cont:{time:"08:30",name:'',msg:'可以',type:'weixin'}
			}]
		}
		if(window.chatWarpIndex == 2)	{
			costemer = [{
				time:"08:16:10:102",
				type:0,
				cont:{time:"08:16",name:'',msg:'好的，那我看一下红色外壳',type:'weixin'}
			},{
				time:"08:30:10:100",
				type:0,
				cont:{time:"08:30",name:'',msg:'好的，谢谢！',type:'weixin'}
			},{
				time:"08:40:10:100",
				type:0,
				cont:{time:"08:40",name:'',msg:'好的',type:'weixin'}
			}]
		}
		if(window.chatWarpIndex == 4)	{
			costemer = [{
				time:"08:16:10:102",
				type:0,
				cont:{time:"08:16",name:'',msg:'就是想要这个业务，帮我开通吧',type:'feixin'}
			},{
				time:"08:30:10:100",
				type:0,
				cont:{time:"08:30",name:'',msg:'没有了，谢谢！',type:'feixin'}
			}]
		}
		/*--------------------------------------------------------------------------------------------------------*/
		costemerIndex = 0;
		var clickCount = 0;
		if(window.chatWarpIndex == 4){
			clickCount = 0;
		}
		$chatWarp.find(".sendBtn").unbind("click").bind("click",function(){
			var html = UE.getEditor("editor_"+window.chatWarpIndex).getAllHtml();
			var $chatWarp = $(this).parents(".chatWarp");
			var o = {
				time:"09:16:10:100",
				type:1,
				cont:{time:"08:16",name:'',msg:html,type:'feixin'}
			}
			//演示第一个的时候使用飞信渠道回复
			if(window.chatWarpIndex == 0){
				o.cont.type = "feixin";
			}
			//如果是微信咨询则微信回复
			/*--------------------------------------------------------------------------------------------------------*/
			if(window.chatWarpIndex == 1){
				o.cont.type = "weixin";
			}
			if(window.chatWarpIndex == 2){
				o.cont.type = "weixin";
			}
			if(window.chatWarpIndex == 4){
				o.cont.type = "feixin";
			}
			/*--------------------------------------------------------------------------------------------------------*/
			createMsgItem(o,1,$chatWarp);
			var $items = $chatWarp.find(".items");
			nicesx = nicesx&&createScroll($items,"245");
			var nicesxFn = function(){
				var height = $chatWarp.find(".items > .warp").outerHeight(true);
				var $items = $chatWarp.find(".items");
				$items.scrollTop(height);
				nicesx&&nicesx.resize();
			}
			setTimeout(nicesxFn,10);
			line($chatWarp);
			//ue.setContent("");
			
			$(".capacityPrompt").hide(0);
			
			if(window.chatWarpIndex == 4){
				clickCount++;
				if(clickCount<2){
					return;
				}
			}
			
			//重新计算等待时间
			$("#content .nav > .panel:gt(1)").eq(window.chatWarpIndex).find(".msgInfo .message h1 span").text("00:00");
			interSetTime(window.chatWarpIndex);
			//演示使用
			costemerIndex = costemerIndexMap[window.chatWarpIndex];
			if(window.chatWarpIndex <= costemerIndexMap.length && costemerIndex < costemer.length){
				o = costemer[costemerIndex];			
				window.setTimeout(function(){
					createMsgItem(o,1,$chatWarp);
					//line($chatWarp);
					$chatWarp.find(".warp > div").removeClass("last lastRepItem").attr("style","");
					var $lastDiv = $chatWarp.find(".warp > div:last");
					if($lastDiv.hasClass("item")){
						$chatWarp.find(".warp > div.repItem:last").addClass("lastRepItem");
						$lastDiv.addClass("last");
					}else{
						$lastDiv.addClass("last");
					}
					//更新滚动条
					//nicesx = createScroll($items,"445");
					setTimeout(nicesxFn,10);
				},1500);
			}
			if(window.chatWarpIndex <= costemerIndexMap.length)	{
				costemerIndex++;
				costemerIndexMap[window.chatWarpIndex] = costemerIndex;
			}
			
			//清除时间闪动
			if(window.interFadeTime && window.chatWarpIndex == 0){
				window.clearInterval(window.interFadeTime);
				$("#content .nav > .panel:gt(1)").eq(window.chatWarpIndex).find(".msgInfo .message h1 span").show();
			}
		});
		
		nicesRight = Util.busiComm.createScroll($(".scrollBody>.chatRight").height(743));
		$(".scrollBody>.chatRight").delegate(".more,.trigger","click",function(){
			nicesRight.resize();
		});
		$("div.edui-editor.edui-default").width("auto");
		
		//交流方式
		$(".intercommunion>div").hide(0);
		$("#content .chatTool li .phone").removeClass("hangUp").parents(".on").removeClass("on");
		var $timer = $("#content .intercommunion .speech .timer");
		$timer.attr("timer","0").text("00:00:00");
		window.speechTimer&&clearInterval(window.speechTimer);
		$("#content").undelegate(".chatTool li .phone","click.speech").delegate(".chatTool li .phone","click.speech",function(){
			$timer.attr("timer","0").text("00:00:00");
			if($(this).hasClass("hangUp")){
				$(this).removeClass("hangUp").parents(".on").removeClass("on");
				$(".intercommunion .speech").hide(0);
				window.speechTimer&&clearInterval(window.speechTimer);
			}else{
				$(this).addClass("hangUp");
				$(".intercommunion .speech").show(0);
				function formatDoubleDigit(number){//格式为两位数
					return number<10?"0"+number:number;
				}
				window.speechTimer = setInterval(function(){
					var text = parseInt($timer.attr("timer"),10)||0;
					text += 1;
					var timer = [
						formatDoubleDigit(Math.floor(text/3600)),
						formatDoubleDigit(Math.floor(text%3600/60)),
						formatDoubleDigit(Math.floor(text%3600%60))
					];
					$timer.attr("timer",text).text(timer.join(":"));
				},1000);
			}
		});
	});

	return {
		content: content
	}

})
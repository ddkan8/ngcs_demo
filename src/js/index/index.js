define(['Util','js/index/header'],function (Util,header) {

	//创建tab标签
	var glbTab, glbTabArr = [], tabDefaultData, serviceTS = 0;
	//获取tab页签信息
	Util.svMap.add('tab','tab.json','');

	$(function(){
		//获取当前聊天客户
		Util.ajax.getJsonAsync(Util.svMap.get('tab'),'',function(json,status){
			if (status) {
				tabDefaultData = json;
			};
		})

		setInterval(function(){
			serviceTS = serviceTS + 1;
			var dstr = secondsFormatStr(serviceTS);
			$(".serviceT > span").text(dstr);
		},1000)	

		//搜索知识框按钮
		$("#search_knowledge").on('click', function(){
			Util.busiComm.switchTab("搜索知识","pages/searchhot.html", glbTab);
		})

		//收缩侧栏
		$(".leftSc").on('click', function(){
			if ($("#content .content .nav").width() == '50') {
				$("#content .content .nav").animate({width:"245px"},100);
				$(".chatWarp .content .chatLeft .items .msgCont").animate({width:"530px"},100);
		        $(".chatBox").animate({width:"706px"},100);
				$(".leftSc").removeClass("sc2");
				//交谈框自适应
				$("div.edui-editor.edui-default").width("auto");
			}else{
				$("#content .content .nav").animate({width:"50px"},100);
				$(".chatWarp .content .chatLeft .items .msgCont").animate({width:"740px"},100);
				$(".chatBox").animate({width:"901px"},100);
				$(".leftSc").addClass("sc2");
				//交谈框自适应
				$("div.edui-editor.edui-default").width("auto");
			}
		});

		//切换聊天客户
		$("#content .nav > .panel:not(0) .msgInfo").on('click',function(e){
			var $this = $(this);
			$this.addClass("select").parents(".panel").siblings().find(".msgInfo").removeClass("select");
			$this.find(".bubble").hide();
			
			var index = $this.parents(".panel").index()-3;
			createChartWrap(index);//创建聊天面板
			
			$("#content .userInfoItem").eq(index).addClass("show").siblings().removeClass("show");
			//清除闪动
			if(window.firstPush && index == 0){
				window.clearInterval(window.firstPush);
				$this.find(".feixin").removeClass("fade");
				window.setTimeout(function(){
					$this.find(".feixin").removeClass("fade");
				},500);
			}
		}).eq(1).click();
		// console.log(glbTab)
		header(glbTab);//加载菜单

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
		//公告
		$(".entertainingDiversions").bind("play",function(){
			var $txt = $(this).find(".txt");
			var $this = $(this);
			var tw = $txt.width();
			var iw = $this.innerWidth();
			if(tw<=iw)return;
			$txt.text($txt.text()+$txt.text());
			window.entertainingDiversionsTime = setInterval(function(){
				var lef = parseInt($txt.css("margin-left"),10);
				lef -=1;
				if(Math.abs(lef)>= tw){
					lef = 0;
				}
				$txt.css("margin-left",lef+"px");
			},60);
		}).bind("stop",function(){
			clearInterval(window.entertainingDiversionsTime);
		});

		$(".entertainingDiversions").trigger("play");
		Util.busiComm.bindInpEvent($(".search > input"),"搜索知识");

		$(".tools .entertainingDiversions").click(function(){
			Util.busiComm.switchTab("公告", '', glbTab);
		});

		// interSetTime();

		//点击下一个请求
		$(".tirggerRequest").click(function(e){
			var time = [];
			$("#content .nav > .panel:not(0) .msgInfo .message h1 span").each(function(index, element) {
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
			$("#content .nav > .panel").eq(nextIndex).find(".msgInfo").click();
		})
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

		//查看历史
	  	$("#content .centerW .seeHistory").click(function(){
			 seeHistoryFn();
			 return false;
		});
	})

	//工作时间
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
	var seeHistory;
	function seeHistoryFn(){
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
		removeUe();
		var $div = $("<div class='weiboUe'/>");
		$warp.append($div);
		$div.load("pages/ue.html",function(){
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
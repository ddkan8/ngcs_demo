define(['Util'],function(Util){
	//创建标签页
	var switchTab = function(title,url,glbTab){
		//显示标签页
		var settings = {title:title,url:url || ""};
		var tab = glbTab.createTab(settings);
		//第一次创建，则显示
		if(tab.$innerWrap){
			tab.show();
		}else{
			//查找该标签页
			for(var i=0;i<glbTab.items.length;i++){
				if(glbTab.items[i].$innerWrap.text() == title){
					glbTab.items[i].show();
					break;
				}
			}
		}
	}

	//文本框交互
	//o:input
	//v:默认值
	var bindInpEvent = function(o,v,type,passwordUiId){
		if(type == "password"){
			var $input = $(o).prev("."+$(o).attr("name")+"Proxy");
			if(!$input[0]){
				$input = $("<input id='"+passwordUiId+"'  type='text' class='"+$(o).attr("name")+"Proxy'/>");
				$input.insertBefore($(o));
				$(o).hide();
				$input.val(v).addClass("normal").focus(function(){
					$(this).hide().click();
					$(o).show().focus();
				})
				$(o).val(v).focus(function(){
					var val = $(this).val();
					if(val == v){
						$(this).val("");
					}
				}).keyup(function(){
				}).blur(function(){
					var val = $(this).val();
					if(val == ""){
						$(this).hide();
						$input.val(v).show();
					}
				});
			}
		}else{
			$(o).val(v).addClass("normal").focus(function(){
				$(this).removeClass("filled");
				var val = $(this).val();
				if(val == v){
					$(this).val("");
					$(this).addClass("filled");
				} else {
					$(this).addClass("filled");
				}
			}).unbind("blur.inputBlur").bind("blur.inputBlur",function(){
				var val = $(this).val();
				if($.trim(val)==""){
					$(this).val(v).removeClass("filled");
				}
			}).unbind("keydown").keydown(function(){
				$(this).removeClass("filled");
				var val = $(this).val();
				if(val != v)
					$(this).addClass("filled");
			});
		}
	}

	//生成滚动条
	var createScroll = function(obj,height){	
		var scrollbar;
		try{		
			//更新滚动条
			scrollbar = obj.niceScroll();
			height&&obj.css({'height':height+"px"});
		}catch(e){
			scrollbar = null;
		}
		setTimeout(function(){
			scrollbar && scrollbar.resize();
		},3500)
		return scrollbar;
	}
	//时间计时
	var interSetTime = function(index){
		if(window.initinterSetTime){
			if(index+""){
				window.clearInterval(window.initinterSetTime[index]);
				$("#content .nav > .panel:gt(1)").eq(index).find(".msgInfo .message h1 span").each(function(i, element) {
                    var $this = $(this);
					var text = $this.text();
					var str = text.split(":");
					var minutes = parseInt(str[0]);
					var seconds = parseInt(str[1]);
					var odd = new Date(0,0,0,0,minutes,seconds);
					
					var inter = setInterval(function(){
						var s = odd.getSeconds();
						odd.setSeconds(s+1);
						var m = odd.getMinutes();
						var mText = m<10?"0"+m:m;
						var sText = s<10?"0"+s:s;
						$this.text(mText+":"+sText);
						
						//判断为第一个的时候时间闪动
						if(index == 0){
							fadeTime($this);
						}
					},1000)
					window.initinterSetTime[index]= inter;
                });
			}
		}else{
			window.initinterSetTime = [];
			var $span = $("#content .nav > .panel:gt(1) .msgInfo .message h1 span");
			$span.each(function(i, element) {
				var $this = $(this);
				var text = $this.text();
				var str = text.split(":");
				var minutes = parseInt(str[0]);
				var seconds = parseInt(str[1]);
				var odd = new Date(0,0,0,0,minutes,seconds);
				
				var inter = setInterval(function(){
					var s = odd.getSeconds();
					odd.setSeconds(s+1);
					var m = odd.getMinutes();
					var mText = m<10?"0"+m:m;s
					var sText = s<10?"0"+s:s;
					$this.text(mText+":"+sText);
				},1000)
				
				window.initinterSetTime.push(inter);
			});
		}
	}

	return {
		switchTab: switchTab,
		bindInpEvent: bindInpEvent,
		interSetTime: interSetTime,
		createScroll: createScroll
	};
})
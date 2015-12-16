define([''],function(){
	//加载菜单视图模块
	var map = {
		'/33' : 'module/menuView/demo/demo',
		'/31' : 'module/menuView/demo31/demo',
		'/32' : 'module/menuView/demo32/demo',
		'/34' : 'module/menuView/example/tableTpl',
		'/22' : 'module/menuView/usrMng/usrMain',
		'/41/411' : 'module/menuView/auto_reply/auto_reply',
	};

	return {
		get: function(key){
			return map[key];
		}
	};
});
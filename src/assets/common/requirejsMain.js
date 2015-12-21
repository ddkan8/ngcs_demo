require.config({
	baseUrl : "./src/",
    map: {
      	'*': {
        	'style': 'assets/lib/requirejs/css.min'
      	}
    },
	paths : {
		/*
		*	避免js文件名和映射名相同，防止打包时被当做js文件重命名
		*/
		'text' : 'assets/lib/requirejs/text',
		'jquery' : 'assets/lib/jquery/jquery_1.11.3',
		'hdb' : 'assets/lib/handlebars/handlebars_v4.0.4',
		'hdbHelper' : 'assets/lib/handlebars/helpers',
		'json2' : 'assets/lib/json2/json2',
		'pagination':'assets/lib/pagination/1.2.1/jquery.pagination',
		'blockUI' : 'assets/lib/blockUI/2.64/jquery.blockUI.min',
		'artDialog' : 'assets/lib/dialog/6.0.4/dialog',
		'dialog' : 'assets/common/dialog_amd',
		'ajax' : 'assets/common/ajax_amd',
		'svMap' : 'assets/common/svConfig',
		'pager' : 'assets/common/pager_amd',
        'Util' : 'assets/common/global',
		'datepiker' : 'assets/lib/datepiker/WdatePicker',
		'pop': 'assets/common/pop_amd',
		'tabs': 'assets/common/tab_amd',
		'busiComm': 'assets/common/busiComm'
	},
	waitSeconds:0,
	shim:{
		'hdb':{
			exports:['Handlebars']
		},
		'hdbHelper':{
			deps:['hdb']
		},
		'ajax':{
			deps:['jquery']
		},
		'pagination':{
			deps:['jquery']
		},
		'pager':{
			deps:['pagination']
		},
		'blockUI':{
			deps:['jquery']
		},
		'artDialog': {
			deps:['jquery']
		},
		// 'busiComm': {
		// 	deps:['jquery']
		// },
		'dialog': {
			deps:['artDialog'],
			exports: 'dialog'
		},
		'datepiker' : {
			deps:['jquery'],
			exports:'datepiker'
		}
	}
});

require(['js/index/index'],function(){
	console.log('init index')
});

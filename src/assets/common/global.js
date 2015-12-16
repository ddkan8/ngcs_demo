/*
*	@author: fany
*	@date:2015-09-28
*	@desc:全局公用模块
*		大部分业务模块都会用到，业务模块只需引用此公用模块，无需单个添加。
*		打包工程时，保证公用模块只打包一次，防止重复打包或未打包等情况造成程序出错。例：tableTpl.js
*/
define([
	'jquery',
	'ajax',
	'svMap',
	'pager',
	'dialog',
	'hdb',
	'pop',
	'tabs',
	'busiComm',
	'json2'
], function($, ajax, svMap, pager, dialog,hdb,pop,tabs,busiComm) {
	return {
		$: $,
		ajax: ajax,
		svMap: svMap,
		pager: pager,
		dialog: dialog,
		hdb: hdb,
		tips: pop,
		tabs: tabs,
		busiComm: busiComm
	}
});
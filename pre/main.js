// Disable console methods.
var DEBUG = true;
if(!DEBUG){
	if(!window.console) window.console = {};
	var methods = ["log", "debug", "warn", "info", "group", "groupCollapsed", "groupEnd"];
	for(var i=0;i<methods.length;i++){
		console[methods[i]] = function(){};
	}
}

console.log('requiring...');
require('./build/index');
console.log('required!');

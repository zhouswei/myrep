cordova.define("org.apache.cordova.custombridge.CustomBridgePlugin", function(require, exports, module) {
// android 调用js
var exec = require('cordova/exec');
function custombridge () {
	
}
// android 调用js 范例
custombridge.prototype.android2js = function () {
	console.log('android2js---------------------')
    var nv = document.getElementById("pid");
    nv.innerHTML="World";
}
custombridge.prototype.js2android = function (arg0, sucess, error) {
    exec(sucess, error, 'CustomBridgePlugin', 'js2AndroidMethod', [arg0]);
}
custombridge.prototype.setServerInfo = function (args, sucess, error) {
    console.log('setServerInfo----------------');
    exec(sucess, error, 'CustomBridgePlugin', 'setServerInfo', [args]);
}
custombridge.prototype.setNotifyBageInfo = function (args, sucess, error) {
    console.log('setServerInfo----------------');
    exec(sucess, error, 'CustomBridgePlugin', 'setNotifyBageInfo', [args]);
}
// if (!window.plugins) {
//       window.plugins = {}
// }

// if (!window.plugins.custombridge) {
//     window.plugins.custombridge = new custombridge()
// }
custombridge.install = function () {
    if (!window.plugins) {
        window.plugins = {};
    }
	console.log('install----------------');
    window.plugins.CustomBridgePlugin = new custombridge();
    return window.plugins.CustomBridgePlugin;
  };
  
cordova.addConstructor(custombridge.install);


});

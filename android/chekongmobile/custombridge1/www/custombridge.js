var exec = require('cordova/exec');
function custombridge () {}

// android 调用js 范例
custombridge.prototype.android2js = function () {
    var nv = document.getElementById("pid");
    nv.innerHTML="World";
}
custombridge.prototype.js2android = function (arg0, sucess, error) {
    exec(sucess, error, 'custombridge', 'js2AndroidMethod', [arg0]);
}
custombridge.prototype.setServerInfo = function (args, sucess, error) {
    console.log('setServerInfo----------------');
    exec(sucess, error, 'custombridge', 'setServerInfo', [args]);
}
custombridge.prototype.setNotifyBageInfo = function (args, sucess, error) {
    console.log('setServerInfo----------------');
    exec(sucess, error, 'custombridge', 'setNotifyBageInfo', [args]);
}

custombridge.install = function () {
    if (!cordova.plugins) {
        cordova.plugins = {};
    }
  
    cordova.plugins.custombridge = new custombridge();
    return cordova.plugins.custombridge;
  };
  
cordova.addConstructor(custombridge.install);





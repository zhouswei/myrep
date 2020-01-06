package com.yushi.custombridge;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class custombridge extends CordovaPlugin {

    private static custombridge instance;
    public static Activity cordovaActivity;

    public custombridge(){
        instance = this;
    }
    public static custombridge getCustomInstance(){
        if (instance == null){
            new custombridge();
        }
        return instance;
    }
    public void init(CordovaInterface cordova, CordovaWebView webView) {
        super.privateInitialize("", cordova, webView, null);
        cordovaActivity = cordova.getActivity();
    }
     @Override
    public void onDestroy() {
        super.onDestroy();
        cordovaActivity = null;
        instance = null;
    }
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("js2AndroidMethod")){
            String msg = args.getString(0);
            this.js2AndroidMethod(msg, callbackContext);
            return true;
        } else if (action.equals("setServerInfo")){
            LOG.d("CustomBridgePlugin", "execute");
            JSONObject msg = args.getJSONObject(0);
            this.setServerInfo(msg, callbackContext);
            return true;
        } else if (action.equals("setNotifyBageInfo")){
            LOG.d("CustomBridgePlugin", "execute");
            int bage = args.getInt(0);
            return true;
        } 

        return false;
    }

    public void js2AndroidMethod(String msg, CallbackContext callCtx){
        if (msg != null&& msg.length() > 0){
            callCtx.success(msg);
            Toast.makeText(cordovaActivity, msg, Toast.LENGTH_LONG).show();
        }else {
            callCtx.error("params error !");
        }
    }
    private CallbackContext callback;
    public void setSuccess(){
        callback.success("ok");
    }
    public void setNotifyBageInfo(){
        
    }
    public void setServerInfo(JSONObject msg, CallbackContext callCtx){
        LOG.d("custombridge", msg.toString());
//        android.widget.Toast.makeText(cordovaActivity, msg.toString(), android.widget.Toast.LENGTH_LONG).show();
        if (msg != null&& msg.length() > 0){
//            android.widget.Toast.makeText(cordovaActivity, "44444", android.widget.Toast.LENGTH_LONG).show();
            // callCtx.success(msg);
            callback = callCtx;
            if (cordovaActivity instanceof MainActivity)
            {
//                android.widget.Toast.makeText(cordovaActivity, "55555", android.widget.Toast.LENGTH_LONG).show();
                try {
//                    ((MainActivity)cordovaActivity).setLoginData(msg.getString("launchUrl"), msg.getString("vpnAddress"), msg.getString("vpnUserName"), msg.getString("vpnPassword"), msg.getBoolean("enableVpn"));
                    Intent intent = new Intent(cordovaActivity, LoginActivity.class);
                    // intent.putExtra("launchUrl", msg.getString("launchUrl"));
                    // intent.putExtra("vpnAddress", msg.getString("vpnAddress"));
                    // intent.putExtra("vpnUserName", msg.getString("vpnUserName"));
                    // intent.putExtra("vpnPassword", msg.getString("vpnPassword"));
                    // intent.putExtra("enableVpn", msg.getBoolean("enableVpn"));
                    cordovaActivity.startActivityForResult(intent, 2);
                } catch (JSONException e) {
                    e.printStackTrace();
                }


            }
        }else {
            callCtx.error("params error !");
        }
    }

    public static void transmitNotificationOpen() {
        if (instance == null) {
            return;
        }
        final String format = "cordova.plugins.custombridge.android2js();";
       // final String js = String.format(format);
         new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(10000);
                    cordovaActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            LOG.d("custombridge", "transmitNotificationOpen1111111");
                            instance.webView.loadUrl("javascript:" + format);
                        }
                    });
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }
}

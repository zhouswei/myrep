package org.apache.cordova.custombridge;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.text.TextUtils;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.yushi.chekong.MainActivity;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.LOG;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class CustomBridgePlugin extends CordovaPlugin {

    private static CustomBridgePlugin instance;
    public static Activity cordovaActivity;

    public CustomBridgePlugin(){
        instance = this;
    }
    public static CustomBridgePlugin getCustomInstance(){
        if (instance == null){
            new CustomBridgePlugin();
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
            JSONObject msg = args.getJSONObject(0);
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
//            this.setNotifyBageInfo(bage, callbackContext);
            return true;
        }

        return false;
    }

    public void js2AndroidMethod(JSONObject msg, CallbackContext callCtx){
        if (msg != null&& msg.length() > 0){
            try {
                String StrMethodName = msg.getString("methodname");
                if (!TextUtils.isEmpty(StrMethodName)) {
                    if (StrMethodName.equals("getStatusBarHeight")){
                        int height = getStatusBarHeight();
                        callCtx.success(height);
                    } else if (StrMethodName.equals("entryVideoScreen")) {
//                        cordovaActivity.startActivity();
                        String param = msg.getString("AccessToken");
                        String param2 = msg.getString("videoUrl");
                        if (!TextUtils.isEmpty(param)&&!TextUtils.isEmpty(param2))
                        entryVideoScreen(param, param2);
                    } else if (StrMethodName.equals("entrySecuryScreen")){
						String param1 = msg.getString("token");
						String param2 = msg.getString("userid");
						JSONArray param3 = msg.getJSONArray("list");
						entrySecuryScreen(param1, param2, param3);
					} else if (StrMethodName.equals("entryWebScreen")){
                        String param1 = msg.getString("contenturl");
                        entryWebScreen(param1);
                    }else{
                        callCtx.error("params error !");
                    }
                }else{
                    callCtx.error("params error !");
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }else {
            callCtx.error("params error !");
        }
    }
     public void entryVideoScreen(String AcessToken, String url) {
        if (cordovaActivity instanceof MainActivity){
            MainActivity act = (MainActivity) cordovaActivity;
            act.entrySpecScreen(AcessToken, url);
        }
    }
	public void entrySecuryScreen(String token, String userid, JSONArray list){
		if (cordovaActivity instanceof MainActivity){
            MainActivity act = (MainActivity) cordovaActivity;
            act.entrySpecScreen(token, userid, list);
        }
	}
	public void entryWebScreen(String content){
        if (cordovaActivity instanceof MainActivity){
            MainActivity act = (MainActivity) cordovaActivity;
            act.entryWebScreen(content);
        }
    }
    public int getStatusBarHeight(){
        int statusBarHeight1 = -1;
        //获取status_bar_height资源的ID
        int resourceId = cordovaActivity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0)
            //根据资源ID获取响应的尺寸值
            statusBarHeight1 = cordovaActivity.getResources().getDimensionPixelSize(resourceId);
			statusBarHeight1 = px2dip((float)statusBarHeight1);
        return statusBarHeight1;
    }
	public int px2dip(float pxValue) {
		final float scale = cordovaActivity.getResources().getDisplayMetrics().density;
		return (int) (pxValue / scale + 0.5f); 
	}
    private String mVpnAddress = "https://e.goodfirst.cn";
    private String mUserName = "";
    private String mUserPassword = "";
    private Boolean isVpnLuanch = false;
    private String LauncherAddress = "";
    private CallbackContext callback;
    public void setSuccess(){
        callback.success("ok");
    }
    public void setNotifyBageInfo(){
        
    }
    public void setServerInfo(JSONObject msg, CallbackContext callCtx){
        LOG.d("CustomBridgePlugin", msg.toString());
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
                    Intent intent = new Intent(cordovaActivity, MainActivity.class);
                    intent.putExtra("launchUrl", msg.getString("launchUrl"));
                    intent.putExtra("vpnAddress", msg.getString("vpnAddress"));
                    intent.putExtra("vpnUserName", msg.getString("vpnUserName"));
                    intent.putExtra("vpnPassword", msg.getString("vpnPassword"));
                    intent.putExtra("enableVpn", msg.getBoolean("enableVpn"));
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
        final String format = "cordova.plugins.CustomBridgePlugin.android2js();";
       // final String js = String.format(format);
         new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(10000);
                    cordovaActivity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            LOG.d("CustomBridgePlugin", "transmitNotificationOpen1111111");
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

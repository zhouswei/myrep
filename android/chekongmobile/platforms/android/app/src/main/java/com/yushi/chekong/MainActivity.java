/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.yushi.chekong;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.os.StrictMode;
import android.provider.Settings;
import android.support.annotation.RequiresApi;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ezvizuikit.open.EZUIPlayer;

import org.apache.cordova.*;
import org.apache.cordova.custombridge.CustomBridgePlugin;
import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static android.content.pm.PackageManager.PERMISSION_GRANTED;
import static com.yushi.chekong.DoublePlayActivity.TYPE;
import static com.yushi.chekong.PlayActivity.APPKEY;
import static com.yushi.chekong.PlayActivity.AccessToekn;
import static com.yushi.chekong.PlayActivity.Global_AreanDomain;
import static com.yushi.chekong.PlayActivity.PLAY_URL;
import static java.lang.Thread.sleep;

public class MainActivity extends CordovaActivity
{
    private String mAppKey = "";
    private String mAccessToken = "";
    private String mUrl = "";
    private String mGlobalAreaDomain = "";
    private String mType = "";//UFO CATCHER为是双流切换播放,
    @Override
    public void onCreate(Bundle savedInstanceState)
    {

        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
            StrictMode.setVmPolicy( builder.build() );
        }
        CustomBridgePlugin.getCustomInstance().init(this.cordovaInterface, this.appView);
        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        AndroidBug5497Workaround.assistActivity(this);

        checkPermissionAction(MainActivity.this);
        checkUpdate();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        if(requestCode==2){
            checkPermissionAction(MainActivity.this);//由于不知道是否选择了允许所以需要再次判断
        } else if (requestCode==10086){
            String fileName = STORE_APK_PATH  + "yushi.apk";
            File file = new File(fileName);
            installApk(MainActivity.this, file);
        }
    }

    private AlertDialog mDialog;
    private AlertDialog alertDialog;
    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 1) {
            for (int i = 0; i < permissions.length; i++) {
                if (grantResults[i] == PERMISSION_GRANTED) {//选择了“始终允许”

                } else {
                    checkPermissionAction(MainActivity.this);


                }
            }
        }
    }

    public static byte[] getBytes(InputStream is) throws Exception{
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int len = 0;
        while((len = is.read(buffer))!=-1){
            bos.write(buffer, 0, len);
        }
        is.close();
        bos.flush();
        byte[] result = bos.toByteArray();
        return  result;
    }
    public static synchronized int getVersionCode(Context context) {
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(
                    context.getPackageName(), 0);
            return packageInfo.versionCode;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }
    public final static int SHOW_RESPONSE = 1;
    public final static int SHOW_DOWNLOADED = 2;
    private Handler handler = new Handler() {
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SHOW_DOWNLOADED:
                    dialog.dismiss();

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        boolean hasInstallPermission = MainActivity.this.getPackageManager().canRequestPackageInstalls();
                        if (!hasInstallPermission) {
                            showTipbeleveDialog();
                            return;
                        }else{
                            String fileName = STORE_APK_PATH  + "yushi.apk";
                            File file = new File(fileName);
                            installApk(MainActivity.this, file);
                        }
                    }else{
                        String fileName = STORE_APK_PATH  + "yushi.apk";
                        File file = new File(fileName);
                        installApk(MainActivity.this, file);
                    }

                    break;
                case SHOW_RESPONSE:
                    String response = (String) msg.obj;
                    // 在这里进行UI操作，将结果显示到界面上
                    updateInfo obj = (updateInfo) JSON.parseObject(response, updateInfo.class);
                    int OrginCode = getVersionCode(MainActivity.this);

                    boolean open = true;
                    if (OrginCode < obj.getInternalVersion()){
                        // 升级提示
                        showTipDialog(obj.getAppUrl());
                    }
//                    Toast.makeText(MainActivity.this, obj.getMsg(), Toast.LENGTH_LONG).show();
            }
        }
    };
    public void showTipDialog(String url){
        new AlertDialog.Builder(MainActivity.this)
                .setTitle("更新")
                .setMessage("有新版本是否升级？")
                .setPositiveButton("忽略", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setNegativeButton(
                        "确定",
                        new DialogInterface.OnClickListener() {

                            @Override
                            public void onClick(
                                    DialogInterface dialog,
                                    int which) {
                                dialog.dismiss();
                                showUpdateDialog();
                                new Thread(new Runnable() {
                                    @Override
                                    public void run() {
                                        File file = null;
                                        try {

                                            file = downloadFile(MainActivity.this, url,"yushi", handler);
                                            sleep(3000);

                                        } catch (Exception e) {
                                            e.printStackTrace();

                                        }
                                    }
                                }).start();
                            }
                        }).show();
    }
    public void showTipbeleveDialog(){
        new AlertDialog.Builder(MainActivity.this)
                .setTitle("提示")
                .setMessage("请前去信任该应用")
                .setPositiveButton("忽略", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setNegativeButton(
                        "确定",
                        new DialogInterface.OnClickListener() {

                            @Override
                            public void onClick(
                                    DialogInterface dialog,
                                    int which) {
                                dialog.dismiss();
                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                                MainActivity.startInstallPermissionSettingActivity(MainActivity.this);
                            }
                        }).show();
    }
    private static final String[] permissions = {
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE
    };
    private static void installApk(Activity mContext, File file) {

        Intent intent =new Intent(Intent.ACTION_VIEW);
        if(Build.VERSION.SDK_INT>= Build.VERSION_CODES.N) {
            Uri contentUri = FileProvider.getUriForFile(mContext,"com.yushi.chekong.fileprovider",file);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION|Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
            intent.setDataAndType(contentUri,"application/vnd.android.package-archive");

        }else{
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.setDataAndType(Uri.fromFile(file),"application/vnd.android.package-archive");
        }
        mContext.startActivity(intent);
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    private static void startInstallPermissionSettingActivity(Activity act) {
        //注意这个是8.0新API
        Uri packageURI = Uri.parse("package:" + act.getApplication().getPackageName());
        Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, packageURI);
        act.startActivityForResult(intent, 10086);
    }
    private static void checkPermissionAction(Activity callbackContext) {
        if (Build.VERSION.SDK_INT>= Build.VERSION_CODES.M) {
            String[] realpermissions = new String[]{};
            for (String onepermission : permissions){
                if (ContextCompat.checkSelfPermission(callbackContext, onepermission) != PERMISSION_GRANTED) {
                    realpermissions = Arrays.copyOf(realpermissions, realpermissions.length+1);
                    realpermissions[realpermissions.length-1] = onepermission;
                }
            }
            if (realpermissions.length > 0)
            ActivityCompat.requestPermissions(callbackContext, realpermissions, 1);
        }
    }
    public static final String STORE_APK_PATH = Environment
            .getExternalStorageDirectory().getPath()
            + File.separator + "yushi" + File.separator;
    private static File downloadFile(Activity act,String path, String appName , Handler handler) throws Exception {
        // 如果相等的话表示当前的sdcard挂载在手机上并且是可用的

        if (Environment.MEDIA_MOUNTED.equals(Environment
                .getExternalStorageState())) {
            try {
                URL url = new URL(path);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setConnectTimeout(5000);
                // 获取到文件的大小
                InputStream is = conn.getInputStream();
//            String fileName = SD_FOLDER
//                    + appName+".apk";
                String fileName = STORE_APK_PATH  + "yushi.apk";
                File file = new File(fileName);

                // 目录不存在创建目录
                if (!file.getParentFile().exists())
                    file.getParentFile().mkdirs();
                FileOutputStream fos = new FileOutputStream(file);
                BufferedInputStream bis = new BufferedInputStream(is);
                byte[] buffer = new byte[1024];
                int len;
                int total = 0;
                while ((len = bis.read(buffer)) != -1) {
                    fos.write(buffer, 0, len);
                    total += len;
                }
                handler.sendEmptyMessage(SHOW_DOWNLOADED);
                fos.close();
                bis.close();
                is.close();
                return file;
            }catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        } else {
            throw new IOException("未发现有SD卡");
        }
    }
    CustomDialog dialog = null;
    public void showUpdateDialog() {
        String message = null;
        if (message == null || "".equals(message)) {
            message = "正在升级中";
        }
        Activity curAct = this;
        if (curAct != null) {
            CustomDialog.Builder builder = new CustomDialog.Builder(curAct);
            builder.setTitle(message);
            builder.setShowLoading(true);
            builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface arg0, int arg1) {
                    arg0.dismiss();
                }
            });
            dialog = builder.create();
            // 设置点击外围解散
            //		dialog.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT);//将弹出框设置为全局
            dialog.setCanceledOnTouchOutside(false);
            dialog.show();

        }
    }
    public static String builderUrlParams(Map<String, String> params){
        Set<String> keySet = params.keySet();
        List<String> keyList = new ArrayList<String>(keySet);
        Collections.sort(keyList);
        StringBuilder sb = new StringBuilder();
        for (String key : keyList) {
            String value = params.get(key);
            if (TextUtils.isEmpty(value)) {
                continue;
            }
            sb.append(key);
            sb.append("=");
            try {
                sb.append(URLEncoder.encode(params.get(key),"UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            sb.append("&");
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }
    public void checkUpdate() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection = null;
                try {
                    URL url = new URL("http://testinfoapi.szysst.com/ysapi/app/version");
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestProperty("Content-type","application/x-www-form-urlencoded; charset=utf-8");
                    connection.setRequestMethod("POST");

                    connection.setConnectTimeout(8000);
                    connection.setReadTimeout(8000);

                    Map<String, String> jsonParam = new HashMap<String, String>();
                    jsonParam.put("Token", "c49bdfb76dbc4647a42b65ca0f63c418");
                    jsonParam.put("UserID", "2");

                    DataOutputStream out = new DataOutputStream(connection.getOutputStream());
                    out.writeBytes(MainActivity.builderUrlParams(jsonParam));//向服务器提交数据
                    int code = connection.getResponseCode();//获取服务器返回的状态码，以此来判断数据是否提交成功
                    if(code==200){
                        //数据提交成功，获取服务器返回的数据
                        InputStream in = connection.getInputStream();
                        byte[] result = MainActivity.getBytes(in); //StreamTool.getBytes(is)是自定义的流处理方法，见第一段实例代码
                        Message message = new Message();
                        message.what = SHOW_RESPONSE;
                        // 将服务器返回的结果存放到Message中
                        message.obj = new String(result);
                        handler.sendMessage(message);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    if (connection != null) {
                        connection.disconnect();
                    }
                }
            }
        }).start();
    }
    public  void entrySpecScreen(String token, String userid, JSONArray list){
        Intent intent = new Intent(this, SecuryActivity.class);
        ArrayList<projItem> realist = new ArrayList<projItem>();

        for (int i = 0; i<list.length(); i++){
            projItem item = new projItem();
            try {
                item.setId(((org.json.JSONObject)list.get(i)).getInt("ProjectNO"));
                item.setProjName(((org.json.JSONObject)list.get(i)).getString("ProjectName"));
                realist.add(item);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        intent.putExtra("token", token);
        intent.putExtra("userid", userid);
        intent.putExtra("list", realist);
        this.startActivity(intent);
    }
    public void entryWebScreen(String content){
        if (!TextUtils.isEmpty(content)){
            Intent intent = new Intent(this, WebbrowserActivity.class);
            intent.putExtra("URL_STRING", content);
            this.startActivity(intent);
        }
    }
    public void entrySpecScreen(String accessToken, String videoUrl){
        mAppKey = "2f3d551629f8484eab5424440da067fa";
        mAccessToken = accessToken;
        mUrl = videoUrl;
        if (TextUtils.isEmpty(mAppKey)){
            Toast.makeText(this,"appkey can not be null",Toast.LENGTH_LONG).show();
            return;
        }
        if (TextUtils.isEmpty(mAccessToken)){
            Toast.makeText(this,"accesstoken can not be null",Toast.LENGTH_LONG).show();
            return;
        }
        if (TextUtils.isEmpty(mUrl)){
            Toast.makeText(this,"url can not be null",Toast.LENGTH_LONG).show();
            return;
        }

        saveDefaultParams();
        String url = mUrl;
        String[] urls = mUrl.split(",");
        if (urls != null && urls.length == 2){
            //直播预览

            //启动普通回放页面
            DoublePlayActivity.startPlayActivity(this, mAppKey, mAccessToken, urls[0],urls[1]);
            return;
        }

        EZUIPlayer.EZUIKitPlayMode mode = null;
        mode = EZUIPlayer.getUrlPlayType(mUrl);
        if (mode == EZUIPlayer.EZUIKitPlayMode.EZUIKIT_PLAYMODE_LIVE){

            //启动播放页面
            PlayActivity.startPlayActivity(this, mAppKey, mAccessToken, mUrl);
        }else if(mode == EZUIPlayer.EZUIKitPlayMode.EZUIKIT_PLAYMODE_REC){
            //回放
            PlayBackActivity.startPlayBackActivity(this, mAppKey, mAccessToken, mUrl);

        }else{
            Toast.makeText(this,"播放模式未知，默认进入直播预览模式",Toast.LENGTH_LONG).show();


            //启动播放页面
            PlayActivity.startPlayActivity(this, mAppKey, mAccessToken, mUrl);
        }
    }
    /**
     * 缓存播放参数
     */
    private void saveDefaultParams(){
        SharedPreferences sharedPreferences = getSharedPreferences(getResources().getString(R.string.app_name),0);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(PlayActivity.APPKEY,mAppKey);
        editor.putString(PlayActivity.AccessToekn,mAccessToken);
        editor.putString(PlayActivity.PLAY_URL,mUrl);
        editor.putString(DoublePlayActivity.TYPE,mType);
        editor.putString(PlayActivity.Global_AreanDomain,"");

        editor.commit();
    }
    /**
     * 获取缓存播放参数
     */
    private void getDefaultParams(){
        SharedPreferences sharedPreferences = getSharedPreferences(getResources().getString(R.string.app_name),0);
        mAppKey = sharedPreferences.getString(PlayActivity.APPKEY,"");
        mAccessToken = sharedPreferences.getString(PlayActivity.AccessToekn,"");
        mUrl = sharedPreferences.getString(PlayActivity.PLAY_URL,"");
        mGlobalAreaDomain = sharedPreferences.getString(PlayActivity.Global_AreanDomain,"");
        mType = sharedPreferences.getString(TYPE,"");
    }

}

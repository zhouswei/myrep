package com.yushi.chekong;

import android.os.Handler;
import android.os.Message;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import nl.xservices.plugins.Toast;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * com.yushi.chekong
 * UploadHelper
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/27-18:53
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class UploadHelper {
    Handler mHandler;
    public static final String TAG = "UploadHelper";
    private static final MediaType MEDIA_TYPE_PNG = MediaType.parse("image/png");
    private final OkHttpClient client = new OkHttpClient();

    public UploadHelper(Handler mHandler) {
        this.mHandler = mHandler;
    }

    public String upload(String url, HashMap<String, Object> params,  ArrayList<File>
            files) throws
            Exception {



        MultipartBody.Builder requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM);
///                .addPart(
//                        Headers.of("Content-Disposition", "form-data; name=\"file\"; filename=\"" + fileName + "\""),
//                        RequestBody.create(MEDIA_TYPE_PNG, file))
//                .addPart(
//                        Headers.of("Content-Disposition", "form-data; name=\"imagetype\""),
//                        RequestBody.create(null, imageType))
//                .addPart(
//                        Headers.of("Content-Disposition", "form-data; name=\"userphone\""),
//                        RequestBody.create(null, userPhone))
        int i = 0;
        for (File file: files){
            if (file.exists()){
                requestBody .addFormDataPart("image"+i, file.getName(), RequestBody.create
                        (MediaType.parse
                        ("image/png"), file));
            }
            i++;
        }
        Set<Map.Entry<String, Object>> param = params.entrySet();
        for (Map.Entry<String, Object> item:param){
            requestBody.addFormDataPart(item.getKey(), (String) item.getValue());
        }


        RequestBody realBody = requestBody.build();

        Request request = new Request.Builder()
                .url(url)
                .post(realBody)
                .build();

        Response response;
        mHandler.sendMessage(mHandler.obtainMessage(1001));
        try {
            response = client.newCall(request).execute();
            String jsonString = response.body().string();
            Log.d(TAG, " upload jsonString =" + jsonString);

            if (!response.isSuccessful()) {
                String obj = "upload error code " + response;
                mHandler.sendMessage(mHandler.obtainMessage(1003));
//                mHandler.sendMessage(mHandler.obtainMessage(1001, obj));
                throw new Exception("upload error code " + response);
            } else {
                String obj = jsonString;

                JSONObject jsonObject = new JSONObject(jsonString);
                int errorCode = jsonObject.getInt("Code");
                if (errorCode == 1) {
                    mHandler.sendMessage(mHandler.obtainMessage(1002));
                    Log.d(TAG, " upload data =" + jsonObject.getString("data"));

                    return jsonObject.getString("data");
                } else {
                    mHandler.sendMessage(mHandler.obtainMessage(1003));
                    throw new Exception("upload error code " + errorCode + ",errorInfo=" + jsonObject.getString("errorInfo"));
                }
            }

        } catch (IOException e) {
            Log.d(TAG, "upload IOException ", e);
        } catch (JSONException e) {
            Log.d(TAG, "upload JSONException ", e);
        }
        return null;
    }
}

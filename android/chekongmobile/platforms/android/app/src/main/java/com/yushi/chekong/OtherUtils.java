package com.yushi.chekong;


import android.content.Context;
import android.os.Environment;

import java.io.File;
import java.util.Date;
/**
 * chekong.yushi.com.myapplication
 * OtherUtils
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/17-12:28
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class OtherUtils {
    public static int dip2px(Context context, float dpValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dpValue * scale + 0.5f);
    }

    public static int px2dip(Context context, float pxValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    /**
     * 获取拍照相片存储文件
     * @param context
     * @return
     */
    public static File createFile(Context context){
        File file;
        if(Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){
            String timeStamp = String.valueOf(new Date().getTime());
            file = new File(Environment.getExternalStorageDirectory() +
                    File.separator + timeStamp+".jpg");
        }else{
            File cacheDir = context.getCacheDir();
            String timeStamp = String.valueOf(new Date().getTime());
            file = new File(cacheDir, timeStamp+".jpg");
        }
        return file;
    }

}
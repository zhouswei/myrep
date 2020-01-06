package com.yushi.chekong;

import android.net.Uri;

/**
 * chekong.yushi.com.myapplication
 * ImageItemBean
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/17-12:41
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class ImageItemBean {
    public Uri getImage() {
        return image;
    }

    public void setImage(Uri image) {
        this.image = image;
    }

    private Uri image;

    public int getImageType() {
        return imageType;
    }

    public void setImageType(int imageType) {
        this.imageType = imageType;
    }

    private int imageType = 0;
}

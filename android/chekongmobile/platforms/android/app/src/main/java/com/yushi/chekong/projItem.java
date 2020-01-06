package com.yushi.chekong;

import android.os.Parcel;
import android.os.Parcelable;

import java.io.Serializable;

/**
 * com.yushi.chekong
 * projItem
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/24-21:11
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class projItem implements Parcelable {
    protected projItem(Parcel in) {
        id = in.readInt();
        projName = in.readString();
    }

    public projItem() {
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(id);
        dest.writeString(projName);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<projItem> CREATOR = new Creator<projItem>() {
        @Override
        public projItem createFromParcel(Parcel in) {
            return new projItem(in);
        }

        @Override
        public projItem[] newArray(int size) {
            return new projItem[size];
        }
    };

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    private int id = 0;
    private String projName = "";
}

package com.yushi.chekong;

import android.app.AlertDialog;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * chekong.yushi.com.myapplication
 * SelectTypeDialog
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/17-16:04
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */

public class SelectTypeDialog extends AlertDialog implements View.OnClickListener{
    private Context mContext;//上下文
    private Button mBtnOperation1;
    private Button mBtnOperation2;
    private TextView mTitle;
    private OnClickSecondOperation mOnclickListen;
    private String[] mButtonTextArray;

    public SelectTypeDialog(Context context, OnClickSecondOperation onListener) {
        super(context, R.style.MyDialog);
        this.mContext = context;
        this.mOnclickListen = onListener;
    }
    public SelectTypeDialog(Context context, OnClickSecondOperation onListener, String[] buttonText) {
        super(context, R.style.MyDialog);
        this.mContext = context;
        this.mOnclickListen = onListener;
        this.mButtonTextArray = buttonText;
    }
    @Override
    public void onClick(View v) {
        if (v  == mBtnOperation1){
            if (mOnclickListen != null)
                mOnclickListen.clickOperation1();
            dismiss();
        }else if (v  == mBtnOperation2){
            if (mOnclickListen != null)
                mOnclickListen.clickOperation2();
            dismiss();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setContentView(R.layout.second_operation_layout);
        initUI();
    }
    private void initUI() {
        mBtnOperation1 = findViewById(R.id.button_id1);
        mBtnOperation2 = findViewById(R.id.button_id2);
        mTitle = findViewById(R.id.title);
        if (this.mButtonTextArray != null && this.mButtonTextArray.length > 0) {
            mBtnOperation1.setText(this.mButtonTextArray[0]);
            mBtnOperation2.setText(this.mButtonTextArray[1]);

        }

        mBtnOperation1.setOnClickListener(this);
        mBtnOperation2.setOnClickListener(this);
    }
}
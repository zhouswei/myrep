package com.ztb.magician.activities;
/**
*${CLASSNAME}.java
*Created by zsw on 2016/3/22.
**/

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Message;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.ztb.magician.AppLoader;
import com.ztb.magician.R;
import com.ztb.magician.adapter.TechInfoListAdapter;
import com.ztb.magician.bean.CampanaTechSelectBean;
import com.ztb.magician.bean.${BEANNAME};
import com.ztb.magician.bean.${LISTBEANNAME};
import com.ztb.magician.info.NetInfo;
import com.ztb.magician.info.${INFONAME};
import com.ztb.magician.utils.Constants;
import com.ztb.magician.utils.HttpClientConnector;
import com.ztb.magician.utils.HttpHandler;
import com.ztb.magician.utils.MagicianUserInfo;
import com.ztb.magician.utils.ToastUtil;
import com.ztb.magician.widget.CustomLoadingView;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;

/**
 * ${CLASSNAME}：排钟页选择技师查询页
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2016/3/22
 * Copyright ? 2014-2015 深圳掌通宝科技有限公司-版权所有
 */
public class ${CLASSNAME} extends BaseActivity implements View.OnClickListener{

    private CustomLoadingView loadingView;


    private ListView listView;
    private ${ADAPTERNAME} mAdapter;
    private ${BEANNAME} mViewInfo;
    private static final int ACTION_LOADING = 2;
    private static final int ACTION_REFRESH = 3;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_change_tech_query);
        initView();
    }
    private void initView(){
        getTitleTextView().setText("更换技师");
        getLeftImageVew().setVisibility(View.VISIBLE);
        getLeftImageVew().setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ${CLASSNAME}.this.finish();
            }
        });


        loadingView = (CustomLoadingView) findViewById(R.id.loading_id);
        loadingView.dismiss();

        listView = (ListView) findViewById(R.id.list_id);
        ArrayList<${LISTBEANNAME}> list = new ArrayList<${LISTBEANNAME}>();
        mAdapter = new ${ADAPTERNAME}(list,this);
        listView.setAdapter(mAdapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {


            }
        });
    }
    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == 2){

        }
    }
    @Override
    public void onClick(View v) {
        switch (v.getId()){

        }
    }
    private DealHandler myHandler = new DealHandler(this);
    public static class DealHandler extends HttpHandler{
        private WeakReference<Activity> mWeak;

        public DealHandler(Activity act) {
            super(act);
            this.mWeak = new WeakReference<Activity>(act);
        }

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (mWeak.get() == null){
                return;
            }
            ${CLASSNAME} activity = (${CLASSNAME}) mWeak.get();
            if (msg.what == ACTION_LOADING){
                NetInfo info = (NetInfo) msg.obj;
                if (info != null){
                    if (info.getCode() == HttpClientConnector.ERRO_OTHER_EXCEPTION){

                    }else if (info.getCode() == HttpClientConnector.ERRO_FASTJSON_EXCEPTION){

                    }else {
                        if (info.getCode() == 0) {
                            try{
                                ${INFONAME} subinfo = JSON.parseObject(info.getData(), ${INFONAME}.class);
                                if (subinfo != null){
                                    activity.mViewInfo = new ${BEANNAME}();
                                    ArrayList<${LISTBEANNAME}> list = new ArrayList<${LISTBEANNAME}>();
                                    for (int i = 0; i < subinfo.getBill_item_list().size();i++){
                                        ${LISTBEANNAME} item = new ${LISTBEANNAME}();
                                        //add custom code
                                        list.add(item);
                                    }

                                    //add custom code
                                    activity.mAdapter.setmList(list);
                                    activity.mAdapter.notifyDataSetChanged();
                                }
                            }catch (JSONException e){

                            }
                            catch (Exception e){
                                e.printStackTrace();
                            }


                        }
                    }
                }
            }else if (msg.what == ACTION_REFRESH){
                NetInfo info = (NetInfo) msg.obj;
                if (info != null){
                    if (info.getCode() == HttpClientConnector.ERRO_OTHER_EXCEPTION){

                    }else if (info.getCode() == HttpClientConnector.ERRO_FASTJSON_EXCEPTION){

                    }else if (info.getCode() == 0){
                        try{
                            //add custom code

                        }catch (JSONException e){

                        }catch (Exception e){
                            e.printStackTrace();
                        }
                    }
                }
            }



        }
    }
}

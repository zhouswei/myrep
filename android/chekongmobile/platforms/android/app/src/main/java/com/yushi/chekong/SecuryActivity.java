package com.yushi.chekong;

import android.app.Activity;
import android.app.Dialog;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Resources;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.provider.MediaStore;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.File;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class SecuryActivity extends Activity {
    ArrayList<ImageItemBean> mList;
    @BindView(R.id.input_id)
    EditText inputId;
    @BindView(R.id.grid_view_id)
    GridView gridViewId;
    @BindView(R.id.tv_title_id)
    TextView tvTitleId;
    @BindView(R.id.commit_id)
    TextView commitId;
    @BindView(R.id.title_lan_id)
    RelativeLayout titleLanId;
    @BindView(R.id.back_id)
    ImageButton backId;
    @BindView(R.id.line_id)
    RelativeLayout lineId;
    @BindView(R.id.spanner_id)
    Spinner spannerId;
    private MyAdapter mAdapter;
    public static final int REQUEST_ALBUM_OK = 1;
    public static final int REQUEST_CAMERA = 2;
    public static final int PICTURE_DEL = 3;
    public static final String TAG = "SecuryActivity";
    private File mTmpFile;
    private String mToken;
    private String mUserId;
    private int mProjId;
    private String mProjName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secury);
        ButterKnife.bind(this);
        initData();
        initView();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case PICTURE_DEL:
                if (resultCode == 100) {
                    int index = data.getIntExtra("RESULT_INDEX", -1);
                    if (index != -1) {
                        mList.remove(index);
                        if (mList.size() == 5){
                            ImageItemBean item = new ImageItemBean();
                            item.setImage(getUriFromDrawableRes(this, R.drawable.chenggong));
                            item.setImageType(-1);
                            mList.add(item);
                        }

                        mAdapter.notifyDataSetChanged();
                    }
                }
                break;
            case REQUEST_CAMERA:
                //请求相机
                if (mTmpFile != null) {
                    Log.d(TAG, "onActivityResult: 请求相机： " + mTmpFile.getAbsolutePath());
                    if (mTmpFile.length() > 0) {

                        Uri tmp = Uri.fromFile(mTmpFile);
                        ImageItemBean bean = new ImageItemBean();
                        bean.setImage(tmp);
                        mAdapter.addFirstItem(bean);
                    }

                }
                break;
            case REQUEST_ALBUM_OK:

//                Log.d(TAG, "onActivityResult:相册 " + data.getData().toString());
                ContentResolver resolver = getContentResolver();

                try {
                    Uri tmp = data.getData();
                    if (tmp != null) {
                        ImageItemBean bean = new ImageItemBean();
                        bean.setImage(tmp);
                        mAdapter.addFirstItem(bean);
                    }


                } catch (Exception e) {


                    e.printStackTrace();
                }

                break;

        }
    }

    public Uri getUriFromDrawableRes(Context context, int id) {
        Resources resources = context.getResources();
        String path = ContentResolver.SCHEME_ANDROID_RESOURCE + "://"
                + resources.getResourcePackageName(id) + "/"
                + resources.getResourceTypeName(id) + "/"
                + resources.getResourceEntryName(id);
        return Uri.parse(path);
    }

    private void initData() {
        mList = new ArrayList<ImageItemBean>();
        ImageItemBean item = new ImageItemBean();
        item.setImage(getUriFromDrawableRes(this, R.drawable.chenggong));
        item.setImageType(-1);
        mList.add(item);
        mSpannerList = (ArrayList<projItem>) getIntent().getSerializableExtra("list");
        mToken = getIntent().getStringExtra("token");
        mUserId = getIntent().getStringExtra("userid");
        mProjId = mSpannerList.get(0).getId();
        mProjName = mSpannerList.get(0).getProjName();
    }

    private void showAlbum() {
        Intent albumIntent = new Intent(Intent.ACTION_PICK, null);
        albumIntent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
        startActivityForResult(albumIntent, REQUEST_ALBUM_OK);
    }

    private void showCamera() {
        // 跳转到系统照相机
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (cameraIntent.resolveActivity(getPackageManager()) != null) {
            // 设置系统相机拍照后的输出路径
            // 创建临时文件
            mTmpFile = OtherUtils.createFile(getApplicationContext());

            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(mTmpFile));
            startActivityForResult(cameraIntent, REQUEST_CAMERA);
        } else {
            Toast.makeText(getApplicationContext(), "111111", Toast.LENGTH_SHORT).show();
        }

    }

    private ArrayList<projItem> mSpannerList;
    private ArrayAdapter<String> mSpannerAdapter;

    public ArrayList<String> getSpannerList() {
        ArrayList<String> ml = new ArrayList<String>();
        if (mSpannerList != null && mSpannerList.size() > 0) {
            for (projItem item : mSpannerList) {
                ml.add(item.getProjName());
            }
        } else {

        }
        return ml;
    }

    public void showTipDialog() {
        new AlertDialog.Builder(SecuryActivity.this)
                .setTitle("提示")
                .setCancelable(false)
                .setMessage("是否退出本次编辑")
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
                                SecuryActivity.this.finish();
                            }
                        }).show();
    }
    public void showTipDialog2(String content) {
        new AlertDialog.Builder(SecuryActivity.this)
                .setTitle("提示")
                .setCancelable(false)
                .setMessage(content)
                .setPositiveButton("继续停留", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setNegativeButton(
                        "离开",
                        new DialogInterface.OnClickListener() {

                            @Override
                            public void onClick(
                                    DialogInterface dialog,
                                    int which) {
                                dialog.dismiss();
                                SecuryActivity.this.finish();
                            }
                        }).show();
    }
    CustomDialog dialog = null;
    public void showUpdateDialog() {
        String message = null;
        if (message == null || "".equals(message)) {
            message = "正在上传，请稍后...";
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
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == event.KEYCODE_BACK) {
            // 弹出退出提示框
            showTipDialog();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    private void initView() {
        if (mSpannerList != null&&mSpannerList.size()>0) {
            mSpannerAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_expandable_list_item_1,
                    getSpannerList());
            spannerId.setAdapter(mSpannerAdapter);
            spannerId.setSelection(0, true);
            spannerId.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    mProjId = mSpannerList.get(position).getId();
                    mProjName = mSpannerList.get(position).getProjName();
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) {

                }
            });
        }

        mAdapter = new MyAdapter(mList, this);
        gridViewId.setAdapter(mAdapter);
        gridViewId.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                {

                    if (mList.get(position).getImageType() == -1) {
                        String[] ButtonText = new String[2];
                        ButtonText[0] = "拍摄";
                        ButtonText[1] = "从相册选择";
                        Dialog dg = new SelectTypeDialog(SecuryActivity.this, new OnClickSecondOperation() {
                            @Override
                            public void clickOperation1() {
                                showCamera();
                            }

                            @Override
                            public void clickOperation2() {
                                showAlbum();
                            }
                        }, ButtonText);
                        dg.show();
                        JSONObject obj = new JSONObject();

                    }else {
                        Intent intent = new Intent(SecuryActivity.this, PictureBroswerActivity.class);
                        intent.putExtra("PIC_URI", mList.get(position).getImage());
                        intent.putExtra("PIC_INDEX", position);
                        SecuryActivity.this.startActivityForResult(intent, PICTURE_DEL);
                    }

                }
            }
        });
    }

    public static String getRealFilePath(final Context context, final Uri uri) {

        if (null == uri) return null;

        final String scheme = uri.getScheme();
        String data = null;

        if (scheme == null)
            data = uri.getPath();
        else if (ContentResolver.SCHEME_FILE.equals(scheme)) {
            data = uri.getPath();
        } else if (ContentResolver.SCHEME_CONTENT.equals(scheme)) {
            Cursor cursor = context.getContentResolver().query(uri, new String[]{MediaStore.Images.ImageColumns.DATA}, null, null, null);
            if (null != cursor) {
                if (cursor.moveToFirst()) {
                    int index = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
                    if (index > -1) {
                        data = cursor.getString(index);
                    }
                }
                cursor.close();
            }
        }
        return data;
    }

    @OnClick(R.id.commit_id)
    public void onViewClicked() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                ArrayList<File> files = new ArrayList<File>();
                for (ImageItemBean image : mList) {
                    if (image.getImageType() != -1) {
                        File file = new File(getRealFilePath(SecuryActivity.this, image.getImage()));
                        files.add(file);
                    }

                }
//                UploadImage op = new UploadImage();
                Set<Map.Entry<String, Object>> params;
                HashMap<String, Object> param = new HashMap<String, Object>();
                param.put("UserID", mUserId);
                param.put("Token", mToken);
                param.put("ProjectNO", mProjId + "");
                param.put("Content", inputId.getText().toString());
                params = param.entrySet();
//                op.post("http://testinfoapi.szysst.com/ysapi/app/feedback", params, files);
                UploadHelper op = new UploadHelper(mHandler);
                try {
                    op.upload("http://testinfoapi.szysst.com/ysapi/app/feedback", param, files);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

    }

    private MyHandler mHandler = new MyHandler(this);

    @OnClick(R.id.back_id)
    public void onView1Clicked() {
        showTipDialog();
    }

    static public class MyHandler extends Handler {
        public WeakReference<SecuryActivity> mWeak;

        public MyHandler(SecuryActivity act) {
            mWeak = new WeakReference<SecuryActivity>(act);
        }

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (mWeak.get() == null) {
                return;
            }
            SecuryActivity act = mWeak.get();
            if (msg.what == 1001) {
                act.showUpdateDialog();
//                Toast.makeText(act, "正在上传，请稍后...", Toast.LENGTH_LONG).show();
            } else if (msg.what == 1002) {
                act.dialog.dismiss();
                act.showTipDialog2("上传成功");
//                Toast.makeText(act, "上传成功", Toast.LENGTH_LONG).show();
            }else if (msg.what == 1003){
                act.dialog.dismiss();
                Toast.makeText(act, "上传失败", Toast.LENGTH_LONG).show();
            }
        }
    }
}

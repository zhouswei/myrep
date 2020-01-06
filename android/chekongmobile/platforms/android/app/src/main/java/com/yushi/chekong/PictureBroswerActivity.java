package com.yushi.chekong;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class PictureBroswerActivity extends Activity {

    @BindView(R.id.back_id)
    ImageButton backId;
    @BindView(R.id.commit_id)
    Button commitId;
    @BindView(R.id.image_id)
    ImageView imageId;
    Uri specImage;
    int picIndex = -1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_picture_broswer);
        ButterKnife.bind(this);
        specImage = getIntent().getParcelableExtra("PIC_URI");
        picIndex = getIntent().getIntExtra("PIC_INDEX", -1);
        initView();
    }

    public void initView() {
        imageId.setImageURI(specImage);
    }

    @OnClick({R.id.back_id, R.id.commit_id})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.back_id:
                finish();
                break;
            case R.id.commit_id:
                Intent intent = new Intent();
                intent.putExtra("RESULT_INDEX", picIndex);
                this.setResult(100, intent);
                finish();
                break;
        }
    }
}

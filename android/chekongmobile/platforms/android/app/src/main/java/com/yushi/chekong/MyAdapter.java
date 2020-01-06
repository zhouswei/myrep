package com.yushi.chekong;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.LinkedList;

/**
 * chekong.yushi.com.myapplication
 * MyAdapter
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/13-19:55
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class MyAdapter extends BaseAdapter {
    private ArrayList<ImageItemBean> mList;
    private Context mCx;

    public MyAdapter(ArrayList<ImageItemBean> mList, Context mCx) {
        this.mList = mList;
        this.mCx = mCx;
    }
    public void addFirstItem(ImageItemBean item){
        if (this.mList.size() > 0 && this.mList.size() < 7){
            if (this.mList.size() == 6){
                this.mList.remove(5);
            }
            this.mList.add(this.mList.size() - 1, item);
        }
        this.notifyDataSetChanged();
    }
    @Override
    public int getCount() {
        return mList.size();
    }

    @Override
    public Object getItem(int position) {
        return mList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder = null;
        if (convertView == null){
            convertView = LayoutInflater.from(mCx).inflate(R.layout.list_item_layout, parent,
                    false);
            holder = new ViewHolder();
            holder.imageView = convertView.findViewById(R.id.image_id);
            convertView.setTag(holder);
        }else{
            holder = (ViewHolder) convertView.getTag();

        }
        Picasso.with(mCx).load(mList.get(position).getImage()).centerCrop().resize(OtherUtils.dip2px(mCx,100),OtherUtils.dip2px(mCx,100))
                .error(R.mipmap.icon).into(holder.imageView);
//        holder.imageView.setImageURI(mList.get(position).getImage());
        return convertView;
    }
    public class ViewHolder {
        ImageView imageView;

    }
}

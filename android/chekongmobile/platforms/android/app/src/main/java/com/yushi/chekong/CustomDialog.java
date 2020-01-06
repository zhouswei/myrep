package com.yushi.chekong;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.text.Spanned;
import android.text.method.PasswordTransformationMethod;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;




//自定义风格的弹出框
public class CustomDialog extends Dialog{

    public CustomDialog(Context context) {
        super(context);
    }

    public CustomDialog(Context context, int theme) {
        super(context, theme);
    }

    public static class Builder {
        private Context context;
        private String title;
        private String message;
        private String positiveButtonText;
        private String negativeButtonText;
        private int inputtype = -1;
        private View contentView;
        private boolean isPassWordInput;
        private OnClickListener positiveButtonClickListener;
        private OnClickListener negativeButtonClickListener;
        private OnClickListener closeButtonClickListener;

        private boolean hideTitle;//是否隐藏title
        private boolean is_bule_backgroud; //是否是右边蓝底(新风格)
        private boolean is_bule_backgroud_left; //是否是左边蓝底(新风格)
        private int is_confirmation_message = -1;
        private String elseMessage = null;
        private String blackMessage = null;
        private String colorString = null;
        private boolean isRadio_style;
        private String messages;
        private int what_Radio = -1;
        private String newpositiveButtonText;
        private int gravity = -1;
        private Spanned mSpanned;   //用于Textview有不同样式的情况
        private Spanned title_spanned;

        public void setTitle_spanned(Spanned title_spanned) {
            this.title_spanned = title_spanned;
        }

        public Spanned getSpanned() {
            return mSpanned;
        }

        public void setSpanned(Spanned spanned) {
            mSpanned = spanned;
        }
        public boolean isShowLoading() {
            return isShowLoading;
        }
        public Builder setColorString(String color) {
            this.colorString = color;
            return this;
        }
        public Builder setGravity(int gravity) {
            this.gravity = gravity;
            return this;
        }

        public Builder setPassWordInput(boolean passWordInput) {
            isPassWordInput = passWordInput;
            return this;
        }

        public void setShowLoading(boolean showLoading) {
            isShowLoading = showLoading;
        }

        private boolean isShowLoading= false;

        public Builder(Context context) {
            this.context = context;
        }

        public Builder setMessage(String message) {
            this.message = message;
            return this;
        }
        public Builder setElseMessage(String message) {
            this.elseMessage = message;
            return this;
        }
        public Builder setBlackMessage(String message) {
            this.blackMessage = message;
            return this;
        }

        /**
         * 设置edittext的inputtype
         * @param type
         */
        public Builder setEditTextInputType(int type){
            this.inputtype = type;
            return this;
        }

        /**
         * Set the Dialog message from resource
         *
         * @param message
         * @return
         */
        public Builder setMessage(int message) {
            this.message = (String) context.getText(message);
            return this;
        }
        /**
         * Set the Dialog title from resource
         *
         * @param title
         * @return
         */
        public Builder setTitle(int title) {
            this.title = (String) context.getText(title);
            return this;
        }

        /**
         * Set the Dialog title from String
         *
         * @param title
         * @return
         */

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setContentView(View v) {
            this.contentView = v;
            return this;
        }
        private boolean isHideMessage =false;
        public Builder setMessageHint(boolean isHint){
            isHideMessage = isHint;
            return this;
        }
        /**
         * Set the positive button resource and it's listener
         *
         * @param positiveButtonText
         * @return
         */
        public Builder setPositiveButton(int positiveButtonText,
                                         OnClickListener listener) {
            this.positiveButtonText = (String) context
                    .getText(positiveButtonText);
            this.positiveButtonClickListener = listener;
            return this;
        }

        public Builder setPositiveButton(String positiveButtonText,
                                         OnClickListener listener) {
            this.positiveButtonText = positiveButtonText;
            this.positiveButtonClickListener = listener;
            return this;
        }
        /**
         * @method name:hideTitle
         * @des:隐藏title
         * @param :[]
         * @return type:com.ztb.magician.widget.CustomDialog.Builder
         * @date 创建时间:2016/5/12
         * @author Chuck
         **/
        public Builder hideTitle() {
            this.hideTitle=true;
            return this;
        }
        /**
         * @method name:hideTitle
         * @des:是否是默认的右边蓝底的风格
         * @param :[]
         * @return type:com.ztb.magician.widget.CustomDialog.Builder
         * @date 创建时间:2017/4/6
         * @author zth
         **/
        public Builder is_bule_backgroud() {
            this.is_bule_backgroud=true;
            return this;
        }
        /**
         * @method name:hideTitle
         * @des:是否是默认的左边蓝底的风格
         * @param :[]
         * @return type:com.ztb.magician.widget.CustomDialog.Builder
         * @date 创建时间:2017/4/6
         * @author zth
         **/
        public Builder is_bule_backgroud_left() {
            this.is_bule_backgroud_left=true;
            return this;
        }
        /**
         * @method name:hideTitle
         * @des:是否有radiobutton
         * @param :[]
         * @return type:com.ztb.magician.widget.CustomDialog.Builder
         * @date 创建时间:2017/4/6
         * @author zth
         **/
        public Builder setIsRadio_style(String message) {
            this.isRadio_style=true;
            this.messages = message;
            return this;
        }
        /**
         * @method name:hideTitle
         * @des:弹框确认信息
         * @param :[]
         * @return type:com.ztb.magician.widget.CustomDialog.Builder
         * @date 创建时间:2017/4/7
         * @author zth
         **/
        public Builder is_confirmation_message() {
            this.is_confirmation_message=0;
            return this;
        }



        public Builder setCloseButton(String positiveButtonText,
                                      OnClickListener listener) {
            this.closeButtonClickListener = listener;
            return this;
        }
        public Builder setNegativeButton(int negativeButtonText,
                                         OnClickListener listener) {
            this.negativeButtonText = (String) context
                    .getText(negativeButtonText);
            this.negativeButtonClickListener = listener;
            return this;
        }

        public Builder setNegativeButton(String negativeButtonText,
                                         OnClickListener listener) {
            this.negativeButtonText = negativeButtonText;
            this.negativeButtonClickListener = listener;
            return this;
        }

        public CustomDialog create() {
            LayoutInflater inflater = (LayoutInflater) context
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            // instantiate the dialog with the custom Theme
            final CustomDialog dialog = new CustomDialog(context,R.style.Dialog);
            final View layout = inflater.inflate(R.layout.dialog_normal_layout, null);
            dialog.addContentView(layout, new LayoutParams(
                    LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT));
            // set the dialog title
            if (title != null&&!title.isEmpty())
            {
                ((TextView) layout.findViewById(R.id.title)).setText(title);
                ((TextView) layout.findViewById(R.id.title)).setVisibility(View.VISIBLE);
            }

            if(hideTitle){//是否隐藏title
                ((TextView) layout.findViewById(R.id.title)).setVisibility(View.GONE);
            }
            if (isShowLoading() == true){

                ((TextView) layout.findViewById(R.id.message)).setVisibility(View.GONE);
                ((ProgressBar) layout.findViewById(R.id.loading_id)).setVisibility(View.VISIBLE);
            }
            // set the confirm button
            if (positiveButtonText != null) {
                ((Button) layout.findViewById(R.id.positiveButton))
                        .setText(positiveButtonText);
                if (positiveButtonClickListener != null) {
                    ((Button) layout.findViewById(R.id.positiveButton))
                            .setOnClickListener(new View.OnClickListener() {
                                public void onClick(View v) {
                                    positiveButtonClickListener.onClick(dialog,
                                            DialogInterface.BUTTON_POSITIVE);
                                }
                            });


                }
            } else {
                // if no confirm button just set the visibility to GONE
                layout.findViewById(R.id.middle_line_id).setVisibility(View.GONE);
                layout.findViewById(R.id.positiveButton).setVisibility(
                        View.GONE);
            }
            if (negativeButtonText != null) {
                ((Button) layout.findViewById(R.id.negativeButton))
                        .setText(negativeButtonText);

                if (negativeButtonClickListener != null) {
                    ((Button) layout.findViewById(R.id.negativeButton))
                            .setOnClickListener(new View.OnClickListener() {
                                public void onClick(View v) {
                                    negativeButtonClickListener.onClick(dialog,
                                            DialogInterface.BUTTON_NEGATIVE);
                                }
                            });
                }

            } else {
                // if no confirm button just set the visibility to GONE
                layout.findViewById(R.id.middle_line_id).setVisibility(View.GONE);
                layout.findViewById(R.id.negativeButton).setVisibility(
                        View.GONE);
            }


            // set the content message
            if (message != null) {
                ((TextView) layout.findViewById(R.id.message)).setVisibility(View.VISIBLE);

                ((TextView) layout.findViewById(R.id.message)).setText(message);
            }else{
                ((TextView) layout.findViewById(R.id.message)).setVisibility(View.GONE);
            }
            if(mSpanned!=null){
                ((TextView) layout.findViewById(R.id.message)).setVisibility(View.VISIBLE);
                ((TextView) layout.findViewById(R.id.message)).setText(mSpanned);
            }
            if(title_spanned!=null){
                ((TextView) layout.findViewById(R.id.title)).setVisibility(View.VISIBLE);
                ((TextView) layout.findViewById(R.id.title)).setTextSize(15);
                ((TextView) layout.findViewById(R.id.title)).setText(title_spanned);
            }

            if(colorString!=null){
                ((Button) layout.findViewById(R.id.positiveButton)).setTextColor(Color.parseColor(colorString));
                ((Button) layout.findViewById(R.id.negativeButton)).setTextColor(Color.parseColor(colorString));
            }
            if(gravity==0){
                //居中
                ((TextView) layout.findViewById(R.id.message)).setGravity(Gravity.CENTER);
            }else if(gravity==1){
                //居左
                ((TextView) layout.findViewById(R.id.message)).setGravity(Gravity.START);
            }

            dialog.setContentView(layout);
            return dialog;
        }

    }
}

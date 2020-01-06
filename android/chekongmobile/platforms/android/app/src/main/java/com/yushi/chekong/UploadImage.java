package com.yushi.chekong;

import android.media.Image;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * com.yushi.chekong
 * UploadImage
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2019/3/25-21:55
 * Copyright  2014-2019 深圳掌通宝科技有限公司-版权所有
 */
public class UploadImage {
    String multipart_form_data = "multipart/form-data";
    String twoHyphens = "--";
    String CHARSET = "utf-8"; //设置编码
    String boundary = "--------------------------821645026832749356259266";    // 数据分隔符
    String lineEnd = System.getProperty("line.separator");    // The value is "\r\n" in Windows.

    /*
     * 上传图片内容，格式请参考HTTP 协议格式。
     * 人人网Photos.upload中的”程序调用“http://wiki.dev.renren.com/wiki/Photos.upload#.E7.A8.8B.E5.BA.8F.E8.B0.83.E7.94.A8
     * 对其格式解释的非常清晰。
     * 格式如下所示：
     * --****************fD4fH3hK7aI6
     * Content-Disposition: form-data; name="upload_file"; filename="apple.jpg"
     * Content-Type: image/jpeg
     *
     * 这儿是文件的内容，二进制流的形式
     */
    private void addImageContent(ArrayList<File> files, DataOutputStream output) {
        for(File file : files) {
            String imgType = "";
            imgType = getFileType(file.getPath());
            StringBuilder split = new StringBuilder();
            split.append(twoHyphens + boundary + lineEnd);
            split.append("Content-Disposition: form-data; name=\"img\"; filename=\""+file.getName
                    ()+"\""+lineEnd);
            split.append("Content-Type: "+ imgType +
                    " charset="+CHARSET+lineEnd);
            split.append(lineEnd);

            try {
                // 发送图片数据
                output.write(split.toString().getBytes());
                InputStream is = new FileInputStream(file);
                byte[] bytes = new byte[1024];
                int len = 0;
                while((len=is.read(bytes))!=-1)
                {
                    output.write(bytes, 0, len);
                }
                is.close();
                output.write(lineEnd.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    /*
     * 构建表单字段内容，格式请参考HTTP 协议格式（用FireBug可以抓取到相关数据）。(以便上传表单相对应的参数值)
     * 格式如下所示：
     * --****************fD4fH3hK7aI6
     * Content-Disposition: form-data; name="action"
     * // 一空行，必须有
     * upload
     */
    private void addFormField(Set<Map.Entry<Object,Object>> params, DataOutputStream output) {
        StringBuilder sb = new StringBuilder();
        for(Map.Entry<Object, Object> param : params) {
            sb.append(twoHyphens + boundary + lineEnd);
            sb.append("Content-Disposition: form-data; name=\"" + param.getKey() + "\"" + lineEnd);
            sb.append(lineEnd);
            sb.append(param.getValue() + lineEnd);
        }
        try {
            output.writeBytes(sb.toString());// 发送表单字段数据
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 直接通过 HTTP 协议提交数据到服务器，实现表单提交功能。
     * @param actionUrl 上传路径
     * @param params 请求参数key为参数名，value为参数值
     * @param files 上传文件信息
     * @return 返回请求结果
     */
    public String post(String actionUrl, Set<Map.Entry<Object,Object>> params, ArrayList<File>
            files) {
        HttpURLConnection conn = null;
        DataOutputStream output = null;
        BufferedReader input = null;
        try {
            URL url = new URL(actionUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setConnectTimeout(120000);
            conn.setDoInput(true);        // 允许输入
            conn.setDoOutput(true);        // 允许输出
            conn.setUseCaches(false);    // 不使用Cache
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Connection", "keep-alive");
            conn.setRequestProperty("Charset", CHARSET);
            conn.setRequestProperty("Content-Type", multipart_form_data + "; boundary=" + boundary);

            conn.connect();
            output = new DataOutputStream(conn.getOutputStream());

            addImageContent(files, output);    // 添加图片内容

            addFormField(params, output);    // 添加表单字段内容

            output.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd);// 数据结束标志
            output.flush();

            int code = conn.getResponseCode();
            if(code != 200) {
                throw new RuntimeException("请求‘" + actionUrl +"’失败！");
            }

            input = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder response = new StringBuilder();
            String oneLine;
            while((oneLine = input.readLine()) != null) {
                response.append(oneLine + lineEnd);
            }

            return response.toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            // 统一释放资源
            try {
                if(output != null) {
                    output.close();
                }
                if(input != null) {
                    input.close();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            if(conn != null) {
                conn.disconnect();
            }
        }
    }
    /**
     * 获取图片类型
     *
     * @param filePath
     * @return
     */
    public static String getFileType(String filePath) {
        HashMap<String, String> mFileTypes = new HashMap<String, String>();
        mFileTypes.put("FFD8FF", "image/jpeg");
        mFileTypes.put("89504E47", "image/png");
        mFileTypes.put("47494638", "image/gif");
        mFileTypes.put("49492A00", "image/tif");
        mFileTypes.put("424D", "image/bmp");
        return mFileTypes.get(getFileHeader(filePath));
    }

    /**
     * 获取文件头信息
     *
     * @param filePath
     * @return
     */
    public static String getFileHeader(String filePath) {
        FileInputStream is = null;
        String value = null;
        try {
            is = new FileInputStream(filePath);
            byte[] b = new byte[3];
            is.read(b, 0, b.length);
            value = bytesToHexString(b);
        } catch (Exception e) {
        } finally {
            if (null != is) {
                try {
                    is.close();
                } catch (IOException e) {
                }
            }
        }
        return value;
    }

    /**
     * 将byte字节转换为十六进制字符串
     *
     * @param src
     * @return
     */
    private static String bytesToHexString(byte[] src) {
        StringBuilder builder = new StringBuilder();
        if (src == null || src.length <= 0) {
            return null;
        }
        String hv;
        for (int i = 0; i < src.length; i++) {
            hv = Integer.toHexString(src[i] & 0xFF).toUpperCase();
            if (hv.length() < 2) {
                builder.append(0);
            }
            builder.append(hv);
        }
        return builder.toString();
    }
//    public static void main(String[] args) {
//        try {
//            String response = "";
//
//            BufferedReader in = new BufferedReader(new FileReader("config/actionUrl.properties"));
//            String actionUrl = in.readLine();
//
//            // 读取表单对应的字段名称及其值
//            Properties formDataParams = new Properties();
//            formDataParams.load(new FileInputStream(new File("config/formDataParams.properties")));
//            Set<Map.Entry<Object,Object>> params = formDataParams.entrySet();
//
//            // 读取图片所对应的表单字段名称及图片路径
//            Properties imageParams = new Properties();
//            imageParams.load(new FileInputStream(new File("config/imageParams.properties")));
//            Set<Map.Entry<Object,Object>> images = imageParams.entrySet();
//            Image[] files = new Image[images.size()];
//            int i = 0;
//            for(Map.Entry<Object,Object> image : images) {
//                Image file = new Image(image.getValue().toString(), image.getKey().toString());
//                files[i++] = file;
//            }
////            Image file = new Image("images/apple.jpg", "upload_file");
////            Image[] files = new Image[0];
////            files[0] = file;
//
//            response = new UploadImage().post(actionUrl, params, files);
//            System.out.println("返回结果：" + response);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
}

package com.yushi.chekong;

/**
 * com.yushi.chekong
 * updateInfo
 * 责任人:  zsw
 * 修改人：
 * 创建/修改时间: 2018/12/26-10:31
 * Copyright  2014-2018 深圳掌通宝科技有限公司-版权所有
 */
public class updateInfo {
    private String Version;
    private int InternalVersion;
    private String AppUrl;
    private int HtmlVersion;
    private String HtmlUrl;
    private int Code;
    private String Msg;

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }

    public int getInternalVersion() {
        return InternalVersion;
    }

    public void setInternalVersion(int internalVersion) {
        InternalVersion = internalVersion;
    }

    public String getAppUrl() {
        return AppUrl;
    }

    public void setAppUrl(String appUrl) {
        AppUrl = appUrl;
    }

    public int getHtmlVersion() {
        return HtmlVersion;
    }

    public void setHtmlVersion(int htmlVersion) {
        HtmlVersion = htmlVersion;
    }

    public String getHtmlUrl() {
        return HtmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        HtmlUrl = htmlUrl;
    }

    public int getCode() {
        return Code;
    }

    public void setCode(int code) {
        Code = code;
    }

    public String getMsg() {
        return Msg;
    }

    public void setMsg(String msg) {
        Msg = msg;
    }
}

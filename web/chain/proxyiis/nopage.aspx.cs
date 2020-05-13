using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class nopage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Dictionary<string, string> roules = new Dictionary<string, string>();
        roules.Add("/api/", "http://chain.handnear.com");
        roules.Add("/up/", "http://up.handnear.com");

        var realUrl = "";
        foreach (var url in roules.Keys) {
            if (Request.RawUrl.ToLower().StartsWith(url.ToLower())) {
                realUrl = roules[url] + Request.RawUrl.Substring(url.Length - 1, Request.RawUrl.Length - (url.Length - 1));
                break;
            }
        }
        var result = CreateHttpRequest(realUrl, Request); 
        Response.Write(result);Response.End();
    }

    /// <summary>
    /// 转发HTTP请求
    /// </summary>
    /// <param name="url"></param>
    /// <param name="Request"></param>
    /// <returns></returns>
    public string CreateHttpRequest(string url,HttpRequest Request) {

        if (string.IsNullOrEmpty(url)) { return ""; }

        // Prepare web request...
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
        request.Method = "POST";
        if (Request.InputStream.Length == 0)
        {
            request.Method = "GET";
        }

        foreach (var key in Request.Headers.AllKeys) {
            try
            {
                request.Headers.Add(key, Request.Headers[key]);
            }
            catch (Exception ex) { }
        }
        
        request.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
        request.Referer = Request.UrlReferrer==null?"": Request.UrlReferrer.ToString();
        request.Method = Request.HttpMethod;
        request.Accept = string.Join(",", Request.AcceptTypes);
        request.ContentType = Request.ContentType;

        if (Request.InputStream.Length>0) {
            //byte[] data = Encoding.UTF8.GetBytes(post);
            request.ContentLength = Request.InputStream.Length;
            Stream newStream = request.GetRequestStream();
            var bts = new byte[Request.InputStream.Length];
            Request.InputStream.Read(bts, 0, bts.Length);
            newStream.Write(bts, 0, bts.Length);
            newStream.Close();
        }
      
        // Get response
        HttpWebResponse myResponse = (HttpWebResponse)request.GetResponse();
        StreamReader reader = null;
        if (myResponse.ContentEncoding.ToLower().Equals("gzip"))
        {
            reader = new StreamReader(new GZipStream(myResponse.GetResponseStream(), CompressionMode.Decompress), System.Text.Encoding.UTF8);
        }
        else {
             reader = new StreamReader(myResponse.GetResponseStream(), Encoding.UTF8);
        }
        if (myResponse.Headers.Count > 0) {
            foreach (var key in myResponse.Headers.AllKeys) {
                if (key.ToLower().Equals("set-cookie"))
                {
                    var cks = myResponse.Headers[key].Split(",".ToCharArray());
                    foreach (var ck in cks)
                    {
                        Response.Headers.Add(key, ck);
                    }
                }
                else if (key.ToLower().Equals("content-encoding") || key.ToLower().Equals("vary")||key.ToLower().Equals("content-length")) { }
                else
                {
                    Response.Headers.Add(key, myResponse.Headers[key]);
                }
            }
        }
        string content = reader.ReadToEnd();
        return content;
    }
}
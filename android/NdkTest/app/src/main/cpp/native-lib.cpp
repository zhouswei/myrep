#include <jni.h>
#include <string>
#include "internal/custom1.h"
extern "C"
jstring
Java_handnear_ztb_com_ndktest_MainActivity_stringFromJNI(
        JNIEnv* env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    {
        custom1 obj;
        obj.addName(1);
        custom1 &b = obj;//新建了一个对象，并没有对原对象进行引用。
//        custom1 b = obj;//触发拷贝构造函数
//        b = obj;//触发重载的“=”操作符

        b.subName(1);
    }
    int a = 1;
    a = 2;


    return env->NewStringUTF(hello.c_str());
}


//
// Created by Administrator on 2016/7/3.
//
#include<com_example_administrator_facedetect_CustomJniFunc.h>

#include <stdio.h>
#include <stdlib.h>
#include <opencv2/core/core.hpp>
#include <opencv2/contrib/detection_based_tracker.hpp>

#include <string>
#include <vector>
#include <android/log.h>

#define LOG_TAG "FaceDetection/DetectionBasedTracker"
#define LOGD(...) ((void)__android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__))
using namespace std;
using namespace cv;

inline void vector_Rect_to_Mat(vector<Rect>& v_rect, Mat& mat)
{
    mat = Mat(v_rect, true);
}
JNIEXPORT jintArray JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_gray(
        JNIEnv *env, jclass obj, jintArray buf, int w, int h);



JNIEXPORT jintArray JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_gray(
        JNIEnv *env, jclass obj, jintArray buf, int w, int h) {

    jint *cbuf;
    cbuf = env->GetIntArrayElements(buf, JNI_FALSE );
    if (cbuf == NULL) {
        return 0;
    }

    Mat imgData(h, w, CV_8UC4, (unsigned char *) cbuf);

    uchar* ptr = imgData.ptr(0);
    for(int i = 0; i < w*h; i ++){
        //计算公式：Y(亮度) = 0.299*R + 0.587*G + 0.114*B
        //对于一个int四字节，其彩色值存储方式为：BGRA
        int grayScale = (int)(ptr[4*i+2]*0.299 + ptr[4*i+1]*0.587 + ptr[4*i+0]*0.114);
        ptr[4*i+1] = grayScale;
        ptr[4*i+2] = grayScale;
        ptr[4*i+0] = grayScale;
    }

    int size = w * h;
    jintArray result = env->NewIntArray(size);
    env->SetIntArrayRegion(result, 0, size, cbuf);
    env->ReleaseIntArrayElements(buf, cbuf, 0);
    return result;
}
/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeCreateObject
 * Signature: (Ljava/lang/String;I)J
 */
JNIEXPORT jlong JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeCreateObject
  (JNIEnv *jenv, jclass, jstring, jint);
JNIEXPORT jlong JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeCreateObject
  (JNIEnv * jenv, jclass, jstring jFileName, jint faceSize){
      LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeCreateObject enter");
        const char* jnamestr = jenv->GetStringUTFChars(jFileName, NULL);
        string stdFileName(jnamestr);
        jlong result = 0;

        try
        {
            DetectionBasedTracker::Parameters DetectorParams;
            if (faceSize > 0)
                DetectorParams.minObjectSize = faceSize;
            result = (jlong)new DetectionBasedTracker(stdFileName, DetectorParams);
        }
        catch(cv::Exception& e)
        {
            LOGD("nativeCreateObject caught cv::Exception: %s", e.what());
            jclass je = jenv->FindClass("org/opencv/core/CvException");
            if(!je)
                je = jenv->FindClass("java/lang/Exception");
            jenv->ThrowNew(je, e.what());
        }
        catch (...)
        {
            LOGD("nativeCreateObject caught unknown exception");
            jclass je = jenv->FindClass("java/lang/Exception");
            jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeCreateObject()");
            return 0;
        }

        LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeCreateObject exit");
        return result;
  }
/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeDestroyObject
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeDestroyObject
  (JNIEnv *jenv, jclass, jlong);
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeDestroyObject
  (JNIEnv * jenv, jclass, jlong thiz){
      LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeDestroyObject enter");
        try
        {
            if(thiz != 0)
            {
                ((DetectionBasedTracker*)thiz)->stop();
                delete (DetectionBasedTracker*)thiz;
            }
        }
        catch(cv::Exception& e)
        {
            LOGD("nativeestroyObject caught cv::Exception: %s", e.what());
            jclass je = jenv->FindClass("org/opencv/core/CvException");
            if(!je)
                je = jenv->FindClass("java/lang/Exception");
            jenv->ThrowNew(je, e.what());
        }
        catch (...)
        {
            LOGD("nativeDestroyObject caught unknown exception");
            jclass je = jenv->FindClass("java/lang/Exception");
            jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeDestroyObject()");
        }
        LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeDestroyObject exit");
  }
/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeStart
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeStart
  (JNIEnv *jenv, jclass, jlong);
  JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeStart
    (JNIEnv * jenv, jclass, jlong thiz){
         LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeStart enter");
            try
            {
                ((DetectionBasedTracker*)thiz)->run();
            }
            catch(cv::Exception& e)
            {
                LOGD("nativeStart caught cv::Exception: %s", e.what());
                jclass je = jenv->FindClass("org/opencv/core/CvException");
                if(!je)
                    je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, e.what());
            }
            catch (...)
            {
                LOGD("nativeStart caught unknown exception");
                jclass je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeStart()");
            }
            LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeStart exit");
    }

/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeStop
 * Signature: (J)V
 */
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeStop
  (JNIEnv *jenv, jclass, jlong);
  JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeStop
    (JNIEnv * jenv, jclass, jlong thiz){
          LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeStop enter");
            try
            {
                ((DetectionBasedTracker*)thiz)->stop();
            }
            catch(cv::Exception& e)
            {
                LOGD("nativeStop caught cv::Exception: %s", e.what());
                jclass je = jenv->FindClass("org/opencv/core/CvException");
                if(!je)
                    je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, e.what());
            }
            catch (...)
            {
                LOGD("nativeStop caught unknown exception");
                jclass je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeStop()");
            }
            LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeStop exit");
    }


/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeSetFaceSize
 * Signature: (JI)V
 */
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeSetFaceSize
  (JNIEnv *jenv, jclass, jlong, jint);
  JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeSetFaceSize
    (JNIEnv * jenv, jclass, jlong thiz, jint faceSize){
         LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeSetFaceSize enter");
            try
            {
                if (faceSize > 0)
                {
                    DetectionBasedTracker::Parameters DetectorParams = \
                    ((DetectionBasedTracker*)thiz)->getParameters();
                    DetectorParams.minObjectSize = faceSize;
                    ((DetectionBasedTracker*)thiz)->setParameters(DetectorParams);
                }
            }
            catch(cv::Exception& e)
            {
                LOGD("nativeStop caught cv::Exception: %s", e.what());
                jclass je = jenv->FindClass("org/opencv/core/CvException");
                if(!je)
                    je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, e.what());
            }
            catch (...)
            {
                LOGD("nativeSetFaceSize caught unknown exception");
                jclass je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, "Unknown exception in JNI code of DetectionBasedTracker.nativeSetFaceSize()");
            }
            LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeSetFaceSize exit");
    }

/*
 * Class:     com_example_administrator_facedetect_CustomJniFunc
 * Method:    nativeDetect
 * Signature: (JJJ)V
 */
JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeDetect
  (JNIEnv *jenv, jclass, jlong, jlong, jlong);
  JNIEXPORT void JNICALL Java_com_example_administrator_facedetect_CustomJniFunc_nativeDetect
    (JNIEnv * jenv, jclass, jlong thiz, jlong imageGray, jlong faces){
         LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeDetect enter");
            try
            {
                vector<Rect> RectFaces;
                ((DetectionBasedTracker*)thiz)->process(*((Mat*)imageGray));
                ((DetectionBasedTracker*)thiz)->getObjects(RectFaces);
                vector_Rect_to_Mat(RectFaces, *((Mat*)faces));
            }
            catch(cv::Exception& e)
            {
                LOGD("nativeCreateObject caught cv::Exception: %s", e.what());
                jclass je = jenv->FindClass("org/opencv/core/CvException");
                if(!je)
                    je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, e.what());
            }
            catch (...)
            {
                LOGD("nativeDetect caught unknown exception");
                jclass je = jenv->FindClass("java/lang/Exception");
                jenv->ThrowNew(je, "Unknown exception in JNI code DetectionBasedTracker.nativeDetect()");
            }
            LOGD("Java_org_opencv_samples_facedetect_DetectionBasedTracker_nativeDetect exit");
    }





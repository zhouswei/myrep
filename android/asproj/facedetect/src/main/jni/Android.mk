LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)
#OPENCV_CAMERA_MODULES:=off
#OPENCV_INSTALL_MODULES:=off
#OPENCV_LIB_TYPE:=SHARED
#include ../../../../native/jni/OpenCV.mk
#opencv
OPENCVROOT:= E:/eclipseproj/OpenCV-2.4.10-android-sdk
OPENCV_CAMERA_MODULES:=on
OPENCV_INSTALL_MODULES:=on
OPENCV_LIB_TYPE:=SHARED
include ${OPENCVROOT}/sdk/native/jni/OpenCV.mk

LOCAL_SRC_FILES  := com_example_administrator_facedetect_CustomJniFunc.cpp
LOCAL_C_INCLUDES += $(LOCAL_PATH)
#LOCAL_C_INCLUDES += E:/eclipseproj/OpenCV-2.4.10-android-sdk/sdk/native/jni/include
LOCAL_LDLIBS     += -llog -ldl

LOCAL_MODULE     := com_example_administrator_facedetect_CustomJniFunc

include $(BUILD_SHARED_LIBRARY)

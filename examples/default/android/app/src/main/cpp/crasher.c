
#include <jni.h>
#include <sys/user.h>
#include <unistd.h>
#include <stdlib.h>
#include "crasher_2.h"

/************* SIGSEGV *******************************/
JNIEXPORT void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGSEGVCrash(JNIEnv *env, jobject thiz) {
    causeSIGSEGVCrashF1();
}

/*****************************************************/

/************* SIGABRT *******************************/
void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGABRTCrash(JNIEnv *env, jobject thiz) {
    causeSIGABRTCrashF1();
}
/****************************************************/

/************* SIGFPE *******************************/
void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGFPECrash(JNIEnv *env, jobject thiz) {
    causeSIGFPECrashF1();
}
/***************************************************/

/************* SIGILL *******************************/

void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGILLCrash(JNIEnv *env, jobject thiz) {
    causeSIGILLCrashF1();
}
/***************************************************/

/************* SIGBUS *******************************/
void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGBUSCrash(JNIEnv *env, jobject thiz) {
    causeSIGBUSCrashF1();
}
/***************************************************/

/************* SIGTRAP *******************************/
void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_causeSIGTRAPCrash(JNIEnv *env, jobject thiz) {
    causeSIGTRAPCrashF1();
}
/***************************************************/

#include <jni.h>
#include <string>
#include <android/log.h>




/*
 * Throws invalid argument exception
 */
extern "C"
JNIEXPORT void JNICALL
Java_com_instabug_react_example_nativeLibs_CppNativeLib_crashNDK(JNIEnv *env,
                                                                jobject object) {
    __android_log_print(ANDROID_LOG_DEBUG, "NativeC++", "%s", "received invalid value");

    // in Android SDK it's equivalent to causeSIGABRTCrash()
    throw std::invalid_argument("received invalid value");
}
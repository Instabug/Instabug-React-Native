

#include <jni.h>
#include <sys/user.h>
#include <unistd.h>
#include <stdlib.h>
#include "crasher_3.h"

/************* SIGSEGV *******************************/
void causeSIGSEGVCrashF1() {
    causeSIGSEGVCrashF2();
}
/*****************************************************/

/************* SIGABRT *******************************/
void causeSIGABRTCrashF1() {
    causeSIGABRTCrashF2();
}
/****************************************************/

/************* SIGFPE *******************************/


void causeSIGFPECrashF1() {
    causeSIGFPECrashF2();
}
/***************************************************/

/************* SIGILL *******************************/

void causeSIGILLCrashF1() {
    causeSIGILLCrashF2();
}
/***************************************************/

/************* SIGBUS *******************************/

void causeSIGBUSCrashF1() {
    causeSIGBUSCrashF2();
}
/***************************************************/

/************* SIGTRAP *******************************/
void causeSIGTRAPCrashF1() {
    causeSIGTRAPCrashF2();
}
/***************************************************/

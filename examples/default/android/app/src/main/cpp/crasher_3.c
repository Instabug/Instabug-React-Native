//
// Created by islam on 1/28/21.
//
#pragma GCC optimize ("O0")
#include <jni.h>
#include <sys/user.h>
#include <unistd.h>
#include <stdlib.h>
#include "crasher_4.h"

/************* SIGSEGV *******************************/
void causeSIGSEGVCrashF2() {
    causeSIGSEGVCrashF3(NULL);
}
/*****************************************************/

/************* SIGABRT *******************************/
void causeSIGABRTCrashF2() {
    causeSIGABRTCrashF3();
}
/****************************************************/

/************* SIGFPE *******************************/
void causeSIGFPECrashF2() {
    unsigned int *bad_pointer = (unsigned int *)(0xdeadbeef);
    *bad_pointer=0xfeedface;
}
/***************************************************/

/************* SIGILL *******************************/
void causeSIGILLCrashF2() {
    causeSIGILLCrashF3();
}
/***************************************************/

/************* SIGBUS *******************************/
void causeSIGBUSCrashF2() {
    causeSIGBUSCrashF3();
}
/***************************************************/

/************* SIGTRAP *******************************/
void causeSIGTRAPCrashF2() {
    causeSIGTRAPCrashF3();
}
/***************************************************/
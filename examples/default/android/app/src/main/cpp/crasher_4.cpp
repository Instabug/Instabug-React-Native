//
// Created by islam on 1/28/21.
//

#include <jni.h>
#include <sys/user.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdexcept>

extern "C" {
/************* SIGSEGV *******************************/
void causeSIGSEGVCrashF3(volatile int *i) {
    //SIGSEGV
    volatile int j = 34 / *i;
}
/*****************************************************/

/************* SIGABRT *******************************/
void causeSIGABRTCrashF3() {
    //SIGABRT
    throw std::invalid_argument("received invalid value");
}
/****************************************************/

/************* SIGFPE *******************************/
void causeSIGFPECrashF3() {
    //SIGFPE
    raise(SIGFPE);
    pthread_kill(getpid(), SIGFPE);
}
/***************************************************/

/************* SIGILL *******************************/

int causeSIGILLCrashF3() {
    //SIGILL
    raise(SIGILL);
    pthread_kill(getpid(), SIGILL);
}
/***************************************************/

/************* SIGBUS *******************************/

void causeSIGBUSCrashF3() {
    //SIGBUS
    raise(SIGBUS);
    pthread_kill(getpid(), SIGBUS);
}
/***************************************************/

/************* SIGTRAP *******************************/

void causeSIGTRAPCrashF3() {
    //SIGBUS
    __builtin_trap();
}
/***************************************************/
}

package com.instabug.reactlibrary.utils;

import java.lang.reflect.Method;

public class InstabugUtil {
    public static Method getMethod(Class clazz, String methodName, Class... parameterType) {
        final Method[] methods = clazz.getDeclaredMethods();

        for (Method method : methods) {
            if (method.getName().equals(methodName) && method.getParameterTypes().length ==
                    parameterType.length) {
                if (parameterType.length == 0) {
                    method.setAccessible(true);
                    return method;
                }
                for (int i = 0; i < parameterType.length; i++) {
                    if (method.getParameterTypes()[i] == parameterType[i]) {
                        if (i == method.getParameterTypes().length - 1) {
                            method.setAccessible(true);
                            return method;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return null;
    }
}
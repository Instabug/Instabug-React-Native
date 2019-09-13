package com.instabug.reactlibrary.utils;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.instabug.survey.Survey;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Method;
import java.util.List;

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

     public static void sendEvent(ReactApplicationContext reactContext,
                           String eventName,
                           WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    /**
     * Convenience method to convert from a list of Surveys to a JSON array
     *
     * @param list
     *        List of Surveys to be converted to JSON array
     */
    public static JSONArray surveyObjectToJson(List<Survey> list) {
        JSONArray jsonArray = new JSONArray();
        try{
            for (Survey obj : list) {
                JSONObject object = new JSONObject();
                object.put("title", obj.getTitle());
                jsonArray.put(object);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

}
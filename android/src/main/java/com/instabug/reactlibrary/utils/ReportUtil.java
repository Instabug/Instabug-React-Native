package com.instabug.reactlibrary.utils;

import android.net.Uri;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.instabug.library.model.Report;
import com.instabug.library.model.a;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;


/**
 * Created by salmaali on 8/29/18.
 */

public class ReportUtil {

    public static Report createReport(ReadableArray tags, ReadableArray consoleLogs, String userData, ReadableMap userAttributes, ReadableMap fileAttachments) {
        Report report = new Report();
        // map tags
        report.addTag(ArrayUtil.parseReadableArrayOfStrings(tags).toArray(new String[0]));

        // map consoleLogs
        for (int i = 0; i < consoleLogs.size(); i++) {
            ReadableType type = consoleLogs.getType(i);
            if (type == ReadableType.String) {
                report.appendToConsoleLogs(consoleLogs.getString(i));
            }
        }

        // map userData
        report.setUserData(userData);

        // map userAttributes
        ReadableMapKeySetIterator userAttrIterator = userAttributes.keySetIterator();
        while (userAttrIterator.hasNextKey()) {
            String key = userAttrIterator.nextKey();
            ReadableType type = userAttributes.getType(key);
            if (type == ReadableType.String) {
                report.setUserAttribute(key, userAttributes.getString(key));
            }

        }

        // map fileAttachments
        ReadableMapKeySetIterator fileAttachmentsIterator = userAttributes.keySetIterator();
        while (fileAttachmentsIterator.hasNextKey()) {
            String key = fileAttachmentsIterator.nextKey();
            ReadableType type = fileAttachments.getType(key);
            if (type == ReadableType.String) {
                Uri uri = Uri.parse(key);
                report.addFileAttachment(uri, fileAttachments.getString(key));
            }

        }

        return report;
    }

    public static WritableArray parseConsoleLogs(ArrayList<a> consoleLogs) {
        WritableArray writableArray = new WritableNativeArray();

        for(int i = 0; i < consoleLogs.size(); i++) {
            try {
                writableArray.pushString(consoleLogs.get(i).toJson());
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        return writableArray;
    }
}

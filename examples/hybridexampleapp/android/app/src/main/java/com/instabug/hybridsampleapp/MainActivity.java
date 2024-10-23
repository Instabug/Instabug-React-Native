package com.instabug.hybridsampleapp;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.hybridsampleapp.databinding.ActivityMainBinding;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        com.instabug.hybridsampleapp.databinding.ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        binding.buttonReactNative.setOnClickListener(view -> {
            Intent intent = new Intent(MainActivity.this, ReactNativeAppActivity.class);
            startActivity(intent);
        });


        binding.buttonHandled.setOnClickListener(view -> {
            Map<String, String> attributes = new HashMap<>();
            attributes.put("hello", "world");

            IBGNonFatalException exception = new IBGNonFatalException.Builder(new Exception("Handled Java Crash"))
                    .setUserAttributes(attributes)
                    .setFingerprint("My Custom Fingerprint")
                    .setLevel(IBGNonFatalException.Level.CRITICAL)
                    .build();
            CrashReporting.report(exception);
        });

        binding.buttonUnhandled.setOnClickListener(view -> {
            throw new Error("Unhandled Java Crash");
        });
    }
}

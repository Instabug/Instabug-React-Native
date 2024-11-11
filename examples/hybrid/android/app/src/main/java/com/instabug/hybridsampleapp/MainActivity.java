package com.instabug.hybridsampleapp;

import com.instabug.library.logging.listeners.networklogs.NetworkLogListener;
import com.instabug.library.logging.listeners.networklogs.NetworkLogSnapshot;
import com.microsoft.codepush.react.CodePush;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;
import com.instabug.crash.CrashReporting;
import com.instabug.crash.models.IBGNonFatalException;
import com.instabug.hybridsampleapp.databinding.ActivityMainBinding;
import com.instabug.library.okhttplogger.InstabugOkhttpInterceptor;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = "MainActivity";
    private ActivityMainBinding binding;
    private final OkHttpClient client; // Make it final
    NetworkLogListener networkLogListener = new NetworkLogListener() {
        @Override
        public NetworkLogSnapshot onNetworkLogCaptured(NetworkLogSnapshot networkLog) {
            return networkLog;
        }
    };
    public MainActivity() {
        InstabugOkhttpInterceptor instabugOkhttpInterceptor = new InstabugOkhttpInterceptor();
        instabugOkhttpInterceptor.registerNetworkLogsListener(networkLogListener);
        client = new OkHttpClient.Builder()
                .addInterceptor(instabugOkhttpInterceptor)
                .build();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
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

        binding.buttonGraphQL.setOnClickListener(view -> {
            if (client != null) {
                sendGraphQLRequest();
            } else {
                Log.e(TAG, "OkHttpClient is null");
                Toast.makeText(this, "Error: HTTP Client not initialized", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void sendGraphQLRequest() {
        String graphqlQuery = "{"
                + "\"query\": \"query GetCountry { "
                + "  country(code: \\\"EG\\\") { "
                + "    emoji "
                + "    name "
                + "  }"
                + "}\""
                + "}";

        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(JSON, graphqlQuery);

        Request request = new Request.Builder()
                .url("https://countries.trevorblades.com/graphql")
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("ibg-graphql-header", "GetCountry")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Request failed: " + e.getMessage());
                runOnUiThread(() -> {
                    Toast.makeText(MainActivity.this,
                            "Error: " + e.getMessage(),
                            Toast.LENGTH_SHORT).show();
                });
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                final String responseData = response.body().string();
                runOnUiThread(() -> {
                    try {
                        JSONObject jsonObject = new JSONObject(responseData);
                        String result = jsonObject.getJSONObject("data").toString();
                        Toast.makeText(MainActivity.this,
                                "Response: " + result,
                                Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        Log.e(TAG, "Error parsing response: " + e.getMessage());
                        Toast.makeText(MainActivity.this,
                                "Error parsing response: " + e.getMessage(),
                                Toast.LENGTH_SHORT).show();
                    }
                });
                response.close();
            }
        });
    }
}
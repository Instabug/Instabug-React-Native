package com.instabug.reactlibrary.utils;

import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.views.view.ReactViewGroup;
import com.instabug.library.core.InstabugCore;
import com.instabug.library.visualusersteps.TouchedView;
import com.instabug.library.visualusersteps.TouchedViewExtractor;

public class RNTouchedViewExtractor implements TouchedViewExtractor {
    @Override
    public boolean getShouldDependOnNative() {
        return true;
    }

    @Nullable
    @Override
    public TouchedView extract(@NonNull View view, @NonNull TouchedView touchedView) {
        ReactViewGroup reactViewGroup = findReactButtonViewGroup(view);
        if (reactViewGroup == null) return null;
        return getExtractionStrategy(reactViewGroup).extract(reactViewGroup, touchedView);
    }

    @Nullable
    private ReactViewGroup findReactButtonViewGroup(@NonNull View startView) {
        if (isReactButtonViewGroup(startView)) return (ReactViewGroup) startView;
        ViewParent currentParent = startView.getParent();
        int iteratorIndex = 0;
        do {
            if (currentParent == null || isReactButtonViewGroup(currentParent))
                return (ReactViewGroup) currentParent;
            currentParent = currentParent.getParent();
            iteratorIndex++;
        } while (iteratorIndex < 2);
        return null;
    }

    private boolean isReactButtonViewGroup(@NonNull View view) {
        return (view instanceof ReactViewGroup) && view.isFocusable() && view.isClickable();
    }

    private boolean isReactButtonViewGroup(@NonNull ViewParent viewParent) {
        if (!(viewParent instanceof ReactViewGroup)) return false;
        ViewGroup group = (ReactViewGroup) viewParent;
        return group.isFocusable() && group.isClickable();
    }

    private ReactButtonExtractionStrategy getExtractionStrategy(ReactViewGroup reactButton){
        int labelsCount = 0;
        int groupsCount = 0;
        for (int index=0; index < reactButton.getChildCount(); index++){
            View currentView = reactButton.getChildAt(index);
            if (currentView instanceof TextView) {

                labelsCount++;
                continue;
            }
            if (currentView instanceof ViewGroup) {
                groupsCount++;
            }
        }
        if (labelsCount > 1 || groupsCount > 0) return new MultiLabelsExtractionStrategy();
        if (labelsCount == 1) return new SingleLabelExtractionStrategy();
        return new NoLabelsExtractionStrategy();
    }

    interface ReactButtonExtractionStrategy {
        @Nullable
        TouchedView extract(ViewGroup reactButton, TouchedView touchedView);
    }

    class MultiLabelsExtractionStrategy implements ReactButtonExtractionStrategy {
        private final String MULTI_LABEL_BUTTON_PRE_STRING = "A button that contains \"%s\"";

        @Override
        @Nullable
        public TouchedView extract(ViewGroup reactButton, TouchedView touchedView) {

            touchedView.setProminentLabel(
                    InstabugCore.composeProminentLabelForViewGroup(reactButton, MULTI_LABEL_BUTTON_PRE_STRING)
            );
            return touchedView;
        }
    }

    class SingleLabelExtractionStrategy implements ReactButtonExtractionStrategy {

        @Override
        public TouchedView extract(ViewGroup reactButton, TouchedView touchedView) {
            TextView targetLabel = null;
            for (int index = 0; index < reactButton.getChildCount(); index++) {
                View currentView = reactButton.getChildAt(index);
                if (!(currentView instanceof TextView)) continue;
                targetLabel = (TextView) currentView;
                break;
            }
            if (targetLabel == null) return touchedView;

            String labelText = getLabelText(targetLabel);
            touchedView.setProminentLabel(InstabugCore.composeProminentLabelFor(labelText, false));
            return touchedView;
        }

        @Nullable
        private String getLabelText(TextView textView) {
            String labelText = null;
            if (!TextUtils.isEmpty(textView.getText())) {
                labelText = textView.getText().toString();
            } else if (!TextUtils.isEmpty(textView.getContentDescription())) {
                labelText = textView.getContentDescription().toString();
            }
            return labelText;
        }
    }

    class NoLabelsExtractionStrategy implements ReactButtonExtractionStrategy {

        @Override
        public TouchedView extract(ViewGroup reactButton, TouchedView touchedView) {
            touchedView.setProminentLabel(
                    InstabugCore.composeProminentLabelFor(null, false)
            );
            return touchedView;
        }
    }
}

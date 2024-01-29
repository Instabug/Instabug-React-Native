package com.instabug.reactlibrary.utils;

import android.text.TextUtils;
import android.view.View;
import android.view.ViewParent;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.facebook.react.views.text.ReactTextView;
import com.facebook.react.views.view.ReactViewGroup;
import com.instabug.library.core.InstabugCore;
import com.instabug.library.visualusersteps.TouchedView;
import com.instabug.library.visualusersteps.TouchedViewExtractor;

public class RNTouchedViewExtractor implements TouchedViewExtractor {

    private final int depthTraversalLimit = 3;

    /**
     * Determines whether the native Android SDK should depend on native extraction
     * when a label is not found by the RNTouchedViewExtractor.
     *
     * <p>
     * - {@code RNTouchedViewExtractor} tries to find a label.
     * <br>
     * - If it returns a label, the view is labeled with the one returned.
     * <br>
     * - If it returns {@code null}:
     * <br>
     *   - If {@code shouldDependOnNative} is {@code true}, the native Android SDK
     *     will try to extract the label from the view.
     * <br>
     *   - If it's {@code false}, the Android SDK will label it {@code null} as returned
     *     from {@code RNTouchedViewExtractor} without trying to label it.
     * </p>
     *
     * @return {@code true} if the native Android SDK should depend on native extraction,
     *         {@code false} otherwise.
     */
    @Override
    public boolean getShouldDependOnNative() {
        return true;
    }


    @Nullable
    @Override
    public TouchedView extract(@NonNull View view, @NonNull TouchedView touchedView) {
        ReactViewGroup reactViewGroup = findReactButtonViewGroup(view);
        // If no button is found return `null` to leave the extraction of the touched view to the native Android SDK.
        if (reactViewGroup == null) return null;
        return getExtractionStrategy(reactViewGroup).extract(reactViewGroup, touchedView);
    }

    @Nullable
    private ReactViewGroup findReactButtonViewGroup(@NonNull View startView) {
        if (isReactButtonViewGroup(startView)) return (ReactViewGroup) startView;
        ViewParent currentParent = startView.getParent();
        int depth = 1;
        do {
            if (currentParent == null || isReactButtonViewGroup(currentParent))
                return (ReactViewGroup) currentParent;
            currentParent = currentParent.getParent();
            depth++;
        } while (depth < depthTraversalLimit);
        return null;
    }

    private boolean isReactButtonViewGroup(@NonNull View view) {
        return (view instanceof ReactViewGroup) && view.isFocusable() && view.isClickable();
    }

    private boolean isReactButtonViewGroup(@NonNull ViewParent viewParent) {
        if (!(viewParent instanceof ReactViewGroup)) return false;
        ReactViewGroup group = (ReactViewGroup) viewParent;
        return group.isFocusable() && group.isClickable();
    }

    private ReactButtonExtractionStrategy getExtractionStrategy(ReactViewGroup reactButton){
        int labelsCount = 0;
        int groupsCount = 0;
        for (int index=0; index < reactButton.getChildCount(); index++){
            View currentView = reactButton.getChildAt(index);
            if (currentView instanceof ReactTextView) {

                labelsCount++;
                continue;
            }
            if (currentView instanceof ReactViewGroup) {
                groupsCount++;
            }
        }
        if (labelsCount > 1 || groupsCount > 0) return new MultiLabelsExtractionStrategy();
        if (labelsCount == 1) return new SingleLabelExtractionStrategy();
        return new NoLabelsExtractionStrategy();
    }

    interface ReactButtonExtractionStrategy {
        @Nullable
        TouchedView extract(ReactViewGroup reactButton, TouchedView touchedView);
    }

    class MultiLabelsExtractionStrategy implements ReactButtonExtractionStrategy {
        private final String MULTI_LABEL_BUTTON_PRE_STRING = "A button that contains \"%s\"";

        @Override
        @Nullable
        public TouchedView extract(ReactViewGroup reactButton, TouchedView touchedView) {

            touchedView.setProminentLabel(
                    InstabugCore.composeProminentLabelForViewGroup(reactButton, MULTI_LABEL_BUTTON_PRE_STRING)
            );
            return touchedView;
        }
    }

    class SingleLabelExtractionStrategy implements ReactButtonExtractionStrategy {

        @Override
        public TouchedView extract(ReactViewGroup reactButton, TouchedView touchedView) {
            ReactTextView targetLabel = null;
            for (int index = 0; index < reactButton.getChildCount(); index++) {
                View currentView = reactButton.getChildAt(index);
                if (!(currentView instanceof ReactTextView)) continue;
                targetLabel = (ReactTextView) currentView;
                break;
            }
            if (targetLabel == null) return touchedView;

            String labelText = getLabelText(targetLabel);
            touchedView.setProminentLabel(InstabugCore.composeProminentLabelFor(labelText, false));
            return touchedView;
        }

        @Nullable
        private String getLabelText(ReactTextView textView) {
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
        public TouchedView extract(ReactViewGroup reactButton, TouchedView touchedView) {
            touchedView.setProminentLabel(
                    InstabugCore.composeProminentLabelFor(null, false)
            );
            return touchedView;
        }
    }
}

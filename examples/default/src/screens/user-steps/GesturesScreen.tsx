import React from 'react';
import { Alert, ScrollView } from 'react-native';

import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector, Swipeable } from 'react-native-gesture-handler';
import { Box, Center, Text } from 'native-base';

import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export const GesturesScreen: React.FC = () => {
  const showAlert = (message: string) => {
    Alert.alert(message);
  };

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      runOnJS(showAlert)('Tapped.');
    });

  const doubleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(showAlert)('Double tapped.');
    });

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });
  const pinchStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <ScrollView>
      <Screen>
        <Section title="Tap">
          <GestureDetector gesture={tapGesture}>
            <Center bg="primary.600" height={75} rounded="lg">
              <Text color="white" fontSize="md">
                Tap
              </Text>
            </Center>
          </GestureDetector>
        </Section>

        <Section title="Double Tap">
          <GestureDetector gesture={doubleTapGesture}>
            <Center bg="primary.600" height={75} rounded="lg">
              <Text color="white" fontSize="md">
                Double Tap
              </Text>
            </Center>
          </GestureDetector>
        </Section>

        <Section title="Swipe">
          <Swipeable
            renderLeftActions={() => <Box background="red.600" height={75} width={100} />}
            renderRightActions={() => <Box background="green.600" height={75} width={100} />}>
            <Center background="primary.600" height={75}>
              <Text color="white" fontSize="md">
                Swipe
              </Text>
            </Center>
          </Swipeable>
        </Section>

        <Section title="Pinch">
          <Center height={200}>
            <GestureDetector gesture={pinchGesture}>
              <AnimatedBox
                width={100}
                height={100}
                bg="primary.600"
                rounded="2xl"
                style={pinchStyle}
              />
            </GestureDetector>
          </Center>
        </Section>
      </Screen>
    </ScrollView>
  );
};

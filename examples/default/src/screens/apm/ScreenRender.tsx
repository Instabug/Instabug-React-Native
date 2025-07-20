import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { APM } from 'instabug-reactnative';

// CustomComponents
const ScreenRenderSwitch: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>Screen Render Monitoring</Text>
      <TouchableOpacity
        style={[styles.switch, isEnabled && styles.switchEnabled]}
        onPress={() => {
          setIsEnabled(!isEnabled);
          APM.setScreenRenderEnabled(isEnabled);
        }}>
        <View style={[styles.switchThumb, isEnabled && styles.switchThumbEnabled]} />
      </TouchableOpacity>
    </View>
  );
};

const AnimatedBox: React.FC<{ isBlocking: boolean }> = ({ isBlocking }) => {
  const [counter, setCounter] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous animation
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, []);

  // High frequency counter updates to force re-renders
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        // This is where we block if isBlocking is true
        if (isBlocking) {
          const startTime = Date.now();
          // Block for 100ms every render cycle
          while (Date.now() - startTime < 100) {
            // Busy wait - this will cause visible frozen frames
          }
        }
        return prev + 1;
      });
    }, 16); // ~60fps updates

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isBlocking]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.animatedContainer}>
      <Text style={styles.counterText}>Frame Counter: {counter}</Text>
      <Animated.View
        style={[
          styles.animatedBox,
          {
            transform: [{ translateX }],
            backgroundColor: isBlocking ? '#FF6B6B' : '#4ECDC4',
          },
        ]}>
        <Text style={styles.animatedBoxText}>{isBlocking ? 'FROZEN!' : 'Smooth'}</Text>
      </Animated.View>
    </View>
  );
};

interface InstabugButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

const InstabugButton: React.FC<InstabugButtonProps> = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{text}</Text>
    </TouchableOpacity>
  );
};

// Main Component
const ScreenRenderPage: React.FC<NativeStackScreenProps<HomeStackParamList, 'ScreenRender'>> = ({
  navigation,
}) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const blockingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSlowFrames = (): void => {
    setIsBlocking(true);

    // Clear any existing timeout
    if (blockingTimeoutRef.current) {
      clearTimeout(blockingTimeoutRef.current);
    }

    // Stop blocking after 3 seconds
    blockingTimeoutRef.current = setTimeout(() => {
      setIsBlocking(false);
    }, 500);
  };

  const triggerFrozenFrames = (): void => {
    setIsBlocking(true);

    // Clear any existing timeout
    if (blockingTimeoutRef.current) {
      clearTimeout(blockingTimeoutRef.current);
    }

    // Stop blocking after 5 seconds
    blockingTimeoutRef.current = setTimeout(() => {
      setIsBlocking(false);
    }, 3000);
  };

  const navigateToComplexPage = (): void => {
    navigation.navigate('ComplexViews');
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (blockingTimeoutRef.current) {
        clearTimeout(blockingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScreenRenderSwitch />

        <View style={styles.spacer} />

        <AnimatedBox isBlocking={isBlocking} />

        <View style={styles.largeSpacer} />

        <View style={styles.buttonContainer}>
          <InstabugButton
            text={isBlocking ? 'Frames are Delayed! (Wait...)' : 'Trigger Slow Frames (500ms)'}
            onPress={triggerSlowFrames}
            disabled={isBlocking}
          />

          <InstabugButton
            text={isBlocking ? 'Frames are Delayed! (Wait...)' : 'Trigger Frozen Frames (3000ms)'}
            onPress={triggerFrozenFrames}
            disabled={isBlocking}
          />

          <InstabugButton text="Monitored Complex Page" onPress={navigateToComplexPage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  spacer: {
    height: 16,
  },
  largeSpacer: {
    height: 50,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  buttonTextDisabled: {
    color: '#888',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    padding: 2,
  },
  switchEnabled: {
    backgroundColor: '#007AFF',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  switchThumbEnabled: {
    alignSelf: 'flex-end',
  },
  animatedContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  animatedBox: {
    width: 100,
    height: 60,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
  },
  animatedBoxActive: {
    backgroundColor: '#4ECDC4',
    transform: [{ scale: 1.1 }],
  },
  animatedBoxText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ScreenRenderPage;

// Export the screen name constant for navigation
export const SCREEN_NAME = 'ScreenRender';

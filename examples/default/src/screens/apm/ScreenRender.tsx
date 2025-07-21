/* eslint-disable react-native/no-inline-styles */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { APM } from 'instabug-reactnative';

// Custom Components
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

const AnimatedBox: React.FC<{ isBlocking: boolean; blockingIntensity: number }> = ({
  isBlocking,
  blockingIntensity,
}) => {
  const [counter, setCounter] = useState(0);
  const [layoutThrasher, setLayoutThrasher] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Continuous animation - Use native driver for native thread work
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true, // Native driver for native thread
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true, // Native driver for native thread
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  // High frequency counter updates
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);

      // Layout thrashing to block native thread
      if (isBlocking) {
        setLayoutThrasher((prev) => prev + 1);
      }
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

  const getStatusText = () => {
    if (!isBlocking) {
      return 'Running Smoothly';
    }
    if (blockingIntensity === 1) {
      return 'SLOW NATIVE RENDERING!';
    }
    if (blockingIntensity === 2) {
      return 'FROZEN NATIVE THREAD!';
    }
    return 'BLOCKING NATIVE THREAD!';
  };

  const getBoxColor = () => {
    if (!isBlocking) {
      return '#4ECDC4';
    }
    if (blockingIntensity === 1) {
      return '#FFB347';
    } // Orange for slow
    if (blockingIntensity === 2) {
      return '#FF6B6B';
    } // Red for frozen
    return '#FF6B6B';
  };

  // Generate many layout-heavy elements to stress native thread
  const generateHeavyNativeElements = () => {
    if (!isBlocking) {
      return null;
    }

    const elementCount = blockingIntensity === 1 ? 50 : 200; // More elements = more native work

    return Array.from({ length: elementCount }, (_, i) => (
      <View
        key={`heavy-${i}-${layoutThrasher}`} // Force remount on layout thrash
        style={{
          position: 'absolute',
          left: (i * 3) % 300,
          top: (i * 2) % 200,
          width: 20 + (layoutThrasher % 30), // Constantly changing dimensions
          height: 20 + ((layoutThrasher * 2) % 30),
          backgroundColor: `hsl(${(i * 10 + layoutThrasher) % 360}, 70%, 60%)`,
          borderRadius: 5 + (layoutThrasher % 10), // Constantly changing border radius
          transform: [
            { rotate: `${(layoutThrasher * 5 + i * 10) % 360}deg` },
            { scale: 0.5 + (layoutThrasher % 10) / 20 }, // Constantly changing scale
          ],
          opacity: 0.3 + (layoutThrasher % 40) / 100, // Constantly changing opacity
          borderWidth: 1 + (layoutThrasher % 3), // Force layout recalculation
          borderColor: `hsl(${(layoutThrasher * 7) % 360}, 50%, 40%)`,
        }}
      />
    ));
  };

  return (
    <View style={styles.animatedContainer}>
      <Text style={styles.counterText}>Frame Counter: {counter}</Text>
      <Text style={[styles.statusText, isBlocking && styles.statusTextAlert]}>
        Status: {getStatusText()}
      </Text>

      {/* Native thread heavy work area */}
      <View style={styles.nativeWorkArea}>
        <Animated.View
          style={{
            backgroundColor: getBoxColor(),
            transform: [{ translateX }],
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.animatedBoxText}>
            {blockingIntensity === 1 ? 'Slow!' : blockingIntensity === 2 ? 'Frozen!' : 'Smooth'}
          </Text>
        </Animated.View>

        {/* Heavy native rendering elements */}
        {generateHeavyNativeElements()}
      </View>

      {/* Additional native-heavy components */}
      {isBlocking && (
        <View style={styles.heavyNativeSection}>
          {/* Multiple ScrollViews to stress native scrolling */}
          <ScrollView
            style={styles.miniScrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: 1000 }}>
            {Array.from({ length: 100 }, (_, i) => (
              <View
                key={`scroll-${i}-${layoutThrasher}`}
                style={{
                  height: 10,
                  backgroundColor: `hsl(${(i * 20 + layoutThrasher) % 360}, 60%, 70%)`,
                  marginVertical: 1,
                }}
              />
            ))}
          </ScrollView>

          {/* Text that forces layout recalculation */}
          <Text
            style={{
              fontSize: 8 + (layoutThrasher % 10),
              color: `hsl(${layoutThrasher % 360}, 70%, 50%)`,
              textAlign: 'center',
              lineHeight: 12 + (layoutThrasher % 8),
            }}>
            Layout Thrashing Text: {layoutThrasher}
          </Text>
        </View>
      )}
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
  const [blockingIntensity, setBlockingIntensity] = useState(0); // 0 = none, 1 = slow, 2 = frozen
  const blockingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerFrozenFrames = (): void => {
    setIsBlocking(true);
    setBlockingIntensity(2); // Frozen frames mode

    // Clear any existing timeout
    if (blockingTimeoutRef.current) {
      clearTimeout(blockingTimeoutRef.current);
    }

    // Stop blocking after 5 seconds
    blockingTimeoutRef.current = setTimeout(() => {
      setIsBlocking(false);
      setBlockingIntensity(0);
    }, 5000);
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

        <AnimatedBox isBlocking={isBlocking} blockingIntensity={blockingIntensity} />

        <View style={styles.largeSpacer} />

        <View style={styles.buttonContainer}>
          <InstabugButton
            text={isBlocking ? 'Frames are Delayed! (Wait...)' : 'Trigger Frozen Frames (5s)'}
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
  statusText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  statusTextAlert: {
    color: '#FF6B6B', // Red for alert
    fontWeight: 'bold',
  },
  additionalElements: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  smallBox: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 15,
  },
  nativeWorkArea: {
    position: 'relative',
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  heavyNativeSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  miniScrollView: {
    width: '100%',
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default ScreenRenderPage;

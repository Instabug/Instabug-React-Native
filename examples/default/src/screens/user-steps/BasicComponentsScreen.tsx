import React, { useState, useRef } from 'react';
import {
  Alert,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  Switch,
  useWindowDimensions,
  ActivityIndicator,
  View,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Center, HStack, ScrollView, VStack } from 'native-base';
import Instabug from '@instabug/instabug-reactnative-dream11';

import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { nativeBaseTheme } from '../../theme/nativeBaseTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { InputField } from '../../components/InputField';

/**
 * A screen that demonstrates the usage of user steps with basic React Native components.
 *
 * This specific screen doesn't use NativeBase in some parts since we need to focus on
 * capturing React Native provided components rather than implementations built on top of it.
 */
export const BasicComponentsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const textRef = useRef<View>(null);
  const imageRef = useRef<Image>(null);
  const textInputRef = useRef<TextInput>(null);
  const buttonRef = useRef<Button>(null);
  const pressableRef = useRef<View>(null);
  const touchableOpacityRef = useRef<TouchableOpacity>(null);
  const multiTextTouchableOpacityRef = useRef<TouchableOpacity>(null);
  const iconPressableButtonRef = useRef<View>(null);
  const iconButtonRef = useRef<Icon.Button>(null);
  const fourTierTouchableOpacityButtonRef = useRef<TouchableOpacity>(null);
  const switchButtonRef = useRef<Switch>(null);
  const sliderRef = useRef<Slider>(null);
  const activityIndicatorRef = useRef<ActivityIndicator>(null);

  const onPress = (label: string) => {
    return () => {
      Alert.alert(`Pressed "${label}"`);
    };
  };

  function maskAllViews() {
    // Mask Text
    Instabug.addPrivateView(textRef.current!);

    // Mask Image
    Instabug.addPrivateView(imageRef.current!);

    // Mask TextInput
    Instabug.addPrivateView(textInputRef.current!);

    // Mask Button
    Instabug.addPrivateView(buttonRef.current!);

    // Mask Pressable
    Instabug.addPrivateView(pressableRef.current!);

    // Mask TouchableOpacity
    Instabug.addPrivateView(touchableOpacityRef.current!);

    // Mask MultiText touchable opacity Button
    Instabug.addPrivateView(multiTextTouchableOpacityRef.current!);

    // Mask Icon Pressable Button
    Instabug.addPrivateView(iconPressableButtonRef.current!);

    // Mask Icon.Button
    Instabug.addPrivateView(iconButtonRef.current!);

    // Mask A four TouchableOpacity Button
    Instabug.addPrivateView(fourTierTouchableOpacityButtonRef.current!);

    // Mask Switch Button
    Instabug.addPrivateView(switchButtonRef.current!);

    // Mask slider
    Instabug.addPrivateView(sliderRef.current!);

    // Mask slider
    Instabug.addPrivateView(activityIndicatorRef.current!);
  }

  return (
    <ScrollView>
      <Screen>
        <Section title="Text">
          <Text ref={textRef} style={styles.text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias tempore inventore quas
            cum cupiditate ratione, iusto itaque natus maiores fugit.
          </Text>
        </Section>

        <Section title="Image">
          <Center>
            <Image
              ref={imageRef}
              source={require('../../images/logo.png')}
              style={[styles.image, { width: width / 2, height: width / 6 }]}
            />
          </Center>
        </Section>

        <Section title="Text Input">
          <InputField ref={textInputRef} placeholder="Enter your name" />
        </Section>

        <Section title="Button">
          <VStack space="xs">
            <Button ref={buttonRef} onPress={onPress('Default Button')} title="Default Button" />

            <Pressable
              ref={pressableRef}
              onPress={onPress('Icon Pressable Button')}
              style={styles.button}>
              <HStack space={2} alignItems="center" justifyContent="center">
                <Icon name="alert-circle-outline" color="white" />
                <Text style={styles.buttonText}>Icon Pressable Button</Text>
              </HStack>
            </Pressable>

            <TouchableOpacity
              ref={touchableOpacityRef}
              onPress={onPress('Touchable Opacity Button')}
              style={styles.button}>
              <Text style={styles.buttonText}>Touchable Button</Text>
            </TouchableOpacity>

            <TouchableOpacity
              ref={multiTextTouchableOpacityRef}
              onPress={onPress('Touchable Opacity Multiple Texts Button')}
              style={styles.button}>
              <Text style={styles.buttonText}>Touchable Button</Text>
              <Text style={styles.buttonText}>Multiple Texts</Text>
            </TouchableOpacity>

            <Pressable
              ref={iconPressableButtonRef}
              onPress={onPress('Icon Pressable Button')}
              style={styles.button}>
              <Text style={styles.buttonText}>Pressable Button</Text>
              <View collapsable={false}>
                <HStack space={2} alignItems="center" justifyContent="center">
                  <Icon name="alert-circle-outline" color="white" />
                  <Text style={styles.buttonText}>Icon Pressable Button</Text>
                </HStack>
              </View>
            </Pressable>

            <Icon.Button
              style={styles.button}
              ref={iconButtonRef}
              name="alert-circle-outline"
              backgroundColor="#4A99E9"
              size={12}
              onPress={onPress('Icon.Button')}>
              <Text style={styles.buttonText}>Icon Button</Text>
            </Icon.Button>

            <TouchableOpacity
              ref={fourTierTouchableOpacityButtonRef}
              onPress={onPress('1st Tier and 4th Tier Text Button')}
              style={styles.button}>
              <Text style={styles.buttonText}>1st Tier</Text>
              <View collapsable={false}>
                <View collapsable={false}>
                  <View collapsable={false}>
                    <View collapsable={false}>
                      <Text style={styles.buttonText}>4th Tier Nested Button</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </VStack>
        </Section>

        <Section title="Switch">
          <HStack alignItems="center" space="xs">
            <Switch
              ref={switchButtonRef}
              value={isSwitchOn}
              onValueChange={setIsSwitchOn}
              accessibilityLabel="Is Switch On"
            />
            <Text>Is Switch On</Text>
          </HStack>
        </Section>

        <Section title="Slider">
          <Slider
            ref={sliderRef}
            minimumValue={0}
            maximumValue={100}
            accessibilityLabel="Progress Bar"
          />
        </Section>

        <Section title="Activity Indicator">
          <ActivityIndicator ref={activityIndicatorRef} size="large" />
        </Section>

        <Section title="Private Views">
          <Button title="Mask All Views" onPress={() => maskAllViews()} />
        </Section>
      </Screen>
    </ScrollView>
  );
};

const formControlStyles = StyleSheet.create({
  formControl: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 16,
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    resizeMode: 'contain',
  },
  textInput: StyleSheet.flatten([
    formControlStyles.formControl,
    {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#ccc',
    },
  ]),
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: StyleSheet.flatten([
    formControlStyles.formControl,
    {
      backgroundColor: nativeBaseTheme.colors.primary[600],
      justifyContent: 'center',
    },
  ]),
});

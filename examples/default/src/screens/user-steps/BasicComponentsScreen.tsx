import React, { useState } from 'react';
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
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Center, HStack, ScrollView, VStack } from 'native-base';

import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { nativeBaseTheme } from '../../theme/nativeBaseTheme';
import { InputField } from '../../components/InputField';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * A screen that demonstrates the usage of user steps with basic React Native components.
 *
 * This specific screen doesn't use NativeBase in some parts since we need to focus on
 * capturing React Native provided components rather than implementations built on top of it.
 */
export const BasicComponentsScreen: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { width } = useWindowDimensions();

  const onPress = (label: string) => {
    return () => {
      Alert.alert(`Pressed "${label}"`);
    };
  };

  return (
    <ScrollView>
      <Screen>
        <Section title="Text">
          <Text style={styles.text}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias tempore inventore quas
            cum cupiditate ratione, iusto itaque natus maiores fugit.
          </Text>
        </Section>

        <Section title="Image">
          <Center>
            <Image
              source={require('../../images/logo.png')}
              style={[styles.image, { width: width / 2, height: width / 6 }]}
            />
          </Center>
        </Section>

        <Section title="Text Input">
          <InputField placeholder="Enter your name" />
        </Section>

        <Section title="Button">
          <VStack space="xs">
            <Button onPress={onPress('Default Button')} title="Default Button" />

            <Pressable onPress={onPress('Icon Pressable Button')} style={styles.button}>
              <HStack space={2} alignItems="center" justifyContent="center">
                <Icon name="alert-circle-outline" color="white" />
                <Text style={styles.buttonText}>Icon Pressable Button</Text>
              </HStack>
            </Pressable>

            <TouchableOpacity onPress={onPress('Touchable Opacity Button')} style={styles.button}>
              <Text style={styles.buttonText}>Touchable Button</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress('Touchable Opacity Button')} style={styles.button}>
              <Text style={styles.buttonText}>Touchable Button</Text>
              <Text style={styles.buttonText}>Multiple Texts</Text>
            </TouchableOpacity>

            <Pressable onPress={onPress('Touchable Opacity Button')} style={styles.button}>
              <Text style={styles.buttonText}>Pressable Button</Text>
              <View>
                <HStack space={2} alignItems="center" justifyContent="center">
                  <Icon name="alert-circle-outline" color="white" />
                  <Text style={styles.buttonText}>Icon Pressable Button</Text>
                </HStack>
              </View>
            </Pressable>

            <Icon.Button
              style={styles.button}
              name="alert-circle-outline"
              backgroundColor="#4A99E9"
              size={12}
              onPress={onPress('Icon.Button')}>
              <Text style={styles.buttonText}>Icon Button</Text>
            </Icon.Button>

            <TouchableOpacity onPress={onPress('Touchable Opacity Button')} style={styles.button}>
              <Text style={styles.buttonText}>1 Tier</Text>
              <View>
                <View>
                  <View>
                    <Text style={styles.buttonText}>4 Tier Nested Button</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </VStack>
        </Section>

        <Section title="Switch">
          <HStack alignItems="center" space="xs">
            <Switch
              value={isSwitchOn}
              onValueChange={setIsSwitchOn}
              accessibilityLabel="Is Switch On"
            />
            <Text>Is Switch On</Text>
          </HStack>
        </Section>

        <Section title="Slider">
          <Slider minimumValue={0} maximumValue={100} accessibilityLabel="Progress Bar" />
        </Section>

        <Section title="Activity Indicator">
          <ActivityIndicator size="large" />
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

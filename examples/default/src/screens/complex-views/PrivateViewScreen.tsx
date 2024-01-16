import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Center, ScrollView } from 'native-base';
import Instabug from 'instabug-reactnative';

import { Screen } from '../../components/Screen';
import { Section } from '../../components/Section';
import { nativeBaseTheme } from '../../theme/nativeBaseTheme';

/**
 * A screen that demonstates the usage of private views with basic React Native components.
 */
export const PrivateViewScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  // Creating a ref Object using useRef Hook
  const labelTextRef = useRef<Text>(null);
  const imageTextRef = useRef<Image>(null);
  const textInputTextRef = useRef<TextInput>(null);
  const buttonInputTextRef = useRef<Button>(null);
  const viewGroupRef = useRef<View>(null);

  useEffect(() => {
    Instabug.addPrivateView(labelTextRef.current!);
    Instabug.addPrivateView(imageTextRef.current!);
    Instabug.addPrivateView(textInputTextRef.current!);
    Instabug.addPrivateView(buttonInputTextRef.current!);
    Instabug.addPrivateView(viewGroupRef.current!);
  });

  const onPress = (label: string) => {
    return () => {
      Alert.alert(`Pressed "${label}"`);
    };
  };

  return (
    <ScrollView>
      <Screen>
        <Section title="Private Text">
          <Text style={styles.text} ref={labelTextRef}>
            I'm a private text
          </Text>
        </Section>

        <Section title="Private Image">
          <Center>
            <Image
              ref={imageTextRef}
              source={require('../../images/logo.png')}
              style={[styles.image, { width: width / 2, height: width / 6 }]}
            />
          </Center>
        </Section>

        <Section title="Private Text Input">
          <TextInput
            placeholder="Private text"
            ref={textInputTextRef}
            style={styles.textInput}
            value="private text"
          />
        </Section>

        <Section title="Button">
          <Button
            ref={buttonInputTextRef}
            onPress={onPress('private  Button')}
            title="private Button"
          />
        </Section>

        <Section title="Hide group">
          <View ref={viewGroupRef} style={styles.viewGroup}>
            <Text style={styles.text}>Text 1</Text>
            <Text style={styles.text}>Text 2</Text>
          </View>
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
  viewGroup: {
    backgroundColor: 'transparent',
  },
  button: StyleSheet.flatten([
    formControlStyles.formControl,
    {
      backgroundColor: nativeBaseTheme.colors.primary[600],
    },
  ]),
});

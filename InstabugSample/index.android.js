/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    Alert,
    View,
    processColor,
    Aerlt,
    Image,
    TouchableHighlight,
    RecyclerViewBackedScrollView
} from "react-native";
import Instabug from "instabug-reactnative";

export default class InstabugSample extends Component {

    constructor(props) {
        super(props);

        Instabug.setColorTheme(Instabug.colorTheme.light);
        Instabug.setPrimaryColor(processColor('#aaff00'));
        Instabug.setEmailFieldRequired(false);

    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Button
                    onPress={() => {
                                console.log("invoke Button has been clicked");
                                Instabug.invoke()}}
                    title="Invoke Instabug"
                    color="#841584"
                    disabled={false}
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('InstabugSample', () => InstabugSample);

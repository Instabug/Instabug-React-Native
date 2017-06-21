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
    ListView,
    TouchableHighlight,
    RecyclerViewBackedScrollView
} from "react-native";
import Instabug from "instabug-reactnative";
let DialogAndroid = require('react-native-dialogs');

export default class InstabugSample extends Component {

    constructor(props) {
        super(props);
        Instabug.startWithToken('0f0dc916bd9175e3b5d2fdf0cfa49a69',
            Instabug.invocationEvent.floatingButton);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        const that = this;
        return (
            <TouchableHighlight onPress={() => {
                that._pressRow(rowID);
                highlightRow(sectionID, rowID);
            }}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            {rowData}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _genRows() {
        var dataBlob = [
            "Invoke",
            "Invoke with invocation mode",
            "Select invocation event",
            "Show intro message",
            "Unread messages count",
            "Set locale",
            "Set color theme",
            "Set primary color"
        ];
        return dataBlob;
    }

    _pressRow(rowID) {
        if (rowID == 0) {
            Instabug.invoke();
        } else if (rowID == 1) {
            this._showInvocationModeActionSheet();
        } else if (rowID == 2) {
            this._showInvocationEventActionSheet();
        } else if (rowID == 3) {
            Instabug.showIntroMessage();
        } else if (rowID == 4) {

            Instabug.getUnreadMessagesCount((count) => {
                Alert.alert("UnReadMessages", "Messages: " + count);
            });

        } else if (rowID == 5) {
            this._showLocaleActionSheet();
        } else if (rowID == 6) {
            this._showColorThemeActionSheet();
        } else if (rowID == 7) {
            this._showPrimaryColorActionSheet();
        }
    }

    _showInvocationModeActionSheet() {
        let options = {
            "items": [
                "New bug",
                "New Feedback",
                "New Chat",
                "None"
            ],
            "title": "Instabug modes",
            itemsCallback: (id, text) => {
                if (id == 0) {
                    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newBug);
                } else if (id == 1) {
                    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newFeedback);
                } else if (id == 2) {
                    Instabug.invokeWithInvocationMode(Instabug.invocationMode.newChat);
                } else if (id == 3) {
                    Instabug.invokeWithInvocationMode(Instabug.invocationMode.NA);
                }
            }
        };

        showDialog = function () {
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        };

        showDialog();
    }

    _showColorThemeActionSheet() {
        let options = {
            "items": [
                "Light",
                "Dark"
            ],
            "title": "Instabug Themes",
            itemsCallback: (id, text) => {
                if (id == 0) {
                    Instabug.setColorTheme(Instabug.colorTheme.light);
                } else if (id == 1) {
                    Instabug.setColorTheme(Instabug.colorTheme.dark);
                }
            }
        };

        showDialog = function () {
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        };

        showDialog();
    }

    _showPrimaryColorActionSheet() {
        let options = {
            "items": [
                "Red",
                "Green",
                "Blue"
            ],
            "title": "Instabug Primary Color",
            itemsCallback: (id, text) => {
                if (id == 0) {
                    Instabug.setPrimaryColor(processColor('#ff0000'));
                } else if (id == 1) {
                    Instabug.setPrimaryColor(processColor('#00ff00'));
                } else if (id == 2) {
                    Instabug.setPrimaryColor(processColor('#0000ff'));
                }
            }
        };

        showDialog = function () {
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        };

        showDialog();
    }

    _showLocaleActionSheet() {

        let options = {
            "items": [
                "Arabic",
                "Chinese Simplified",
                "Chinese Traditional",
                "Czech",
                "Danish",
                "English",
                "French",
                "German",
                "Italian",
                "Japanese",
                "Polish",
                "Portuguese Brazil",
                "Russian",
                "Spanish",
                "Swedish",
                "Turkish"
            ],
            "title": "Instabug Primary Color",
            itemsCallback: (id, text) => {
                if (id == 0) {
                    Instabug.setLocale(Instabug.locale.arabic);
                } else if (id == 1) {
                    Instabug.setLocale(Instabug.locale.chineseSimplified);
                } else if (id == 2) {
                    Instabug.setLocale(Instabug.locale.chineseTraditional);
                } else if (id == 3) {
                    Instabug.setLocale(Instabug.locale.czech);
                } else if (id == 4) {
                    Instabug.setLocale(Instabug.locale.danish);
                } else if (id == 5) {
                    Instabug.setLocale(Instabug.locale.english);
                } else if (id == 6) {
                    Instabug.setLocale(Instabug.locale.french);
                } else if (id == 7) {
                    Instabug.setLocale(Instabug.locale.german);
                } else if (id == 8) {
                    Instabug.setLocale(Instabug.locale.italian);
                } else if (id == 9) {
                    Instabug.setLocale(Instabug.locale.japanese);
                } else if (id == 10) {
                    Instabug.setLocale(Instabug.locale.polish);
                } else if (id == 11) {
                    Instabug.setLocale(Instabug.locale.portugueseBrazil);
                } else if (id == 12) {
                    Instabug.setLocale(Instabug.locale.russian);
                } else if (id == 13) {
                    Instabug.setLocale(Instabug.locale.spanish);
                } else if (id == 14) {
                    Instabug.setLocale(Instabug.locale.swedish);
                } else if (id == 15) {
                    Instabug.setLocale(Instabug.locale.turkish);
                }
            }
        };

        showDialog = function () {
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        };

        showDialog();
    }

    _showInvocationEventActionSheet() {


        let options = {
            "items": [
                "Shake",
                "Screenshot",
                "Two fingers swipe",
                "Floating button"
            ],
            "title": "Instabug Themes",
            itemsCallback: (id, text) => {
                if (id == 0) {
                    Instabug.setInvocationEvent(Instabug.invocationEvent.shake);
                } else if (id == 1) {
                    Instabug.setInvocationEvent(Instabug.invocationEvent.screenshot);
                } else if (id == 2) {
                    Instabug.setInvocationEvent(Instabug.invocationEvent.twoFingersSwipe);
                } else if (id) {
                    Instabug.setInvocationEvent(Instabug.invocationEvent.floatingButton);
                }
            }
        };

        showDialog = function () {
            let dialog = new DialogAndroid();
            dialog.set(options);
            dialog.show();
        };

        showDialog();
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }

    render() {
        console.log(JSON.stringify(this.state));
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                style={styles.listView}
            />
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    listView: {
        paddingTop: 20
    },
});

AppRegistry.registerComponent('InstabugSample', () => InstabugSample);

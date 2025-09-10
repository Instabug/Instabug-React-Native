import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCallbackHandlers } from "../contexts/callbackContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

type CallBackScreenProps = { title: string };

const TAB_TITLES = [
  "Invoke Handler",
  "onSDKDismissedHandler",
  "onReportSubmitHandler",
  "Network Obfuscated",
  "sync callback",
  "session replay link",
  "on crash report",
];

const CallbackScreen: React.FC = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 14 },
        tabBarStyle: { backgroundColor: "white" },
        tabBarIndicatorStyle: { backgroundColor: "black", height: 3 },
      }}
    >
      {TAB_TITLES.map((title) => (
        <Tab.Screen key={title} name={title}>
          {() => <CallBackTabScreen title={title} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

const CallBackTabScreen: React.FC<CallBackScreenProps> = ({ title }) => {
  const { callbackHandlers, clearList } = useCallbackHandlers();
  const items = callbackHandlers[title] || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.countText}>Items: {items.length}</Text>
        {items.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => clearList(title)}
          >
            <Text style={styles.clearText}>Clear Data</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.fields.map((field, idx) => (
              <View key={idx} style={styles.fieldRow}>
                <Text style={styles.keyText}>{field.key}:</Text>
                <Text style={styles.valueText} testID={`field_value_${field.key}`}  >{field.value}</Text>
              </View>
            ))}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items</Text>}
      />
    </View>
  );
};

export default CallbackScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  countText: { fontSize: 16, fontWeight: "bold" },
  clearButton: { backgroundColor: "#ff5555", padding: 8, borderRadius: 8 },
  clearText: { color: "#fff", fontWeight: "bold" },
  item: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  keyText: { fontWeight: "bold", color: "#333" },
  valueText: { color: "#555", marginLeft: 8 },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#888" },
});

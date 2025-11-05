import { Tabs } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/Store";

const RootLayout = observer(() => {
  const store = useStore();

  const handleReset = () => {
    store.resetAll();
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#23373d",
          shadowColor: "transparent",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#23373d",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b8c1cc",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={() => ({
          title: "Home Screen",
          headerRight: () => (
            <TouchableOpacity onPress={handleReset} style={styles.button}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        })}
      />
      <Tabs.Screen
        name="list"
        options={() => ({
          title: "List Screen",
          headerRight: () => (
            <TouchableOpacity onPress={handleReset} style={styles.button}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        })}
      />
    </Tabs>
  );
});

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#aaaaaa",
  },
});

export default RootLayout;

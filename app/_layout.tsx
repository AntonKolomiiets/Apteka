import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#d4ad7d",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ title: "", headerShown: false }} />
    </Stack>
  );
};

export default Layout;

// d4ad7d 23373d

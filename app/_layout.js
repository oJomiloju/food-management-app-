import { Stack } from "expo-router";
import { Slot } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="fridge" options={{ headerShown: false }} />
      <Stack.Screen name="scan-item" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
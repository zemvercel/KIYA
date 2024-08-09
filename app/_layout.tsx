import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="voiceRecord" options={{ headerShown: false }} />
      <Stack.Screen name="recentSearch" />
    </Stack>
  );
};

export default RootLayout;


import React from "react";
import { Tabs } from "expo-router";


export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="scanner"  options={{
        headerShown: false
      }}/>
       <Tabs.Screen name="search-list"  options={{
        headerShown: false
      }}/>
    </Tabs>
  );
}

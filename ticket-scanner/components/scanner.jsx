import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const scanner = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView className="container mx-auto flex flex-1" edges={['left', 'right']}>
        <View className="flex-1 items-start justify-end pb-40 px-8 bg-greenx-500">
                <Text>scannser</Text>
                <StatusBar style="dark" />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default scanner
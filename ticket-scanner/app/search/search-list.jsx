import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TextInput } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const scanner = () => {

  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaProvider>
        <SafeAreaView className="container mx-auto flex flex-1" edges={['left', 'right']}>
            <View className="flex-1 items-start justify-center px-8 bg-navy">
               <View className="py-3">
                  <Text className="text-white text-2xl font-bold">Search Ticket</Text>
               </View>
               <View className="w-full " >
                  <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                   onChangeText={onChangeNumber}
                   value={number}
                   placeholder="Enter Ticket Id or Customer Name"
                  />
               </View>
                <StatusBar style="light" />
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default scanner
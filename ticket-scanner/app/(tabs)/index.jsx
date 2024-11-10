import { StatusBar } from "expo-status-bar";
import React from "react";
import { ImageBackground, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { bgImage } from '@/assets/images'
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="container mx-auto flex flex-1" edges={['left', 'right']}>
        <ImageBackground source={bgImage} resizeMode="cover" className="flex flex-1 justify-center">
          <View style={styles.overlay} />
          <View className="flex-1 items-start justify-end pb-40 px-8">
            <View className='mb-4'>
              <Text className="text-white font-bold text-3xl mb-2">Jambo! Welcome.</Text>
              <Text className="text-white mb-2">
              To ensure your security, please enter the one-time password (OTP) sent to your phone to continue scanning tickets.
              </Text>
            </View>
            <View className="p-2 w-full">
              <Link href='/search/scanner' className="bg-red-700 rounded-md text-white px-6 py-3 w-full" asChild>
                <Pressable className={'flex flex-row items-center justify-center space-x-4 gap-2'}>
                  <Ionicons name="qr-code" size={18} color="white" />
                  <Text className="text-white font-semibold text-xl text-center">
                    Scan Tickets
                  </Text>
                </Pressable>
              </Link>
              <View className="flex-row items-center px-5 my-4">
                <View className="flex-1 h-[1px] bg-white/50" />
                <Text className="text-white/90 px-3  text-xl">or</Text>
                <View className="flex-1 h-[1px] bg-white/50" />
              </View>
              <View className="flex items-center ">
              <Link href="/search/issue-ticket" className="text-white text-md underline">
                issue gate tickets
              </Link>
              </View>
            </View>
            <StatusBar style="light" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)', // 0.5 is 50% opacity
  },
});

export default App;
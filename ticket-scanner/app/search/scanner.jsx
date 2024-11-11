import { useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import SearchModal from '../../components/search-modal';
import Scanner from '../../components/scanner';



export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaProvider>
        <SafeAreaView className="container mx-auto flex flex-1" edges={['left', 'right']}>
          <View style={styles.container} className="px-8">
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Pressable onPress={requestPermission} className={`w-full`}>
              <Text className={`bg-red-500 text-white w-full py-4 px-6 rounded-md text-center`}>
                Grant Permission
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-navy">
        <StatusBar style="light" />
        <SafeAreaView className="flex-1" edges={['right', 'left','top']}>
          <View style={styles.container} className="bg-navy">

            {/* top nav title and serach */}
            <View className="flex flex-row items-center justify-between p-6">
              <View>
                <Text className="text-white text-xl">
                  Scan Ticket
                </Text>
              </View>
              <View>
                <Pressable className="text-white" onPress={() => setModalVisible(true)}>
                  <MaterialCommunityIcons name="tag-search" size={24} color="white" />
                </Pressable>
              </View>
            </View>

            {/* camera container */}
            <Scanner/>

            {/* search ticket by id modal */}
            <SearchModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

          </View>
        </SafeAreaView>
    </View>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
 
});

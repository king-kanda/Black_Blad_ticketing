import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCAN_AREA_SIZE = SCREEN_WIDTH * 0.7; // 70% of screen width

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

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
                <Pressable className="text-white">
                  <MaterialCommunityIcons name="tag-search" size={24} color="white" />
                </Pressable>
              </View>
            </View>

            {/* camera container */}
            <View style={styles.cameraContainer}>
              <CameraView 
                style={styles.camera} 
                facing="back"
                onBarcodeScanned={({data}) => {
                  setTimeout(async () => {
                    await Linking.openURL(data)
                  }, 600)
                }}
              >

                  <View style={styles.overlay}>
                    {/* Transparent Scanner Area */}
                    <View style={styles.scanArea}>
                      {/* Corner Markers */}
                      <View style={[styles.cornerMarker, styles.topLeft]} />
                      <View style={[styles.cornerMarker, styles.topRight]} />
                      <View style={[styles.cornerMarker, styles.bottomLeft]} />
                      <View style={[styles.cornerMarker, styles.bottomRight]} />
                    </View>
                    {/* Scan Instructions */}
                    <Text style={styles.instructions}>
                      Align QR code within the frame
                    </Text>
                  </View>

              </CameraView>
            </View>
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
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cornerMarker: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#fff',  // White corners
  },
  topLeft: {
    top: -1,
    left: -1,
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  topRight: {
    top: -1,
    right: -1,
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  bottomLeft: {
    bottom: -1,
    left: -1,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
  bottomRight: {
    bottom: -1,
    right: -1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  instructions: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

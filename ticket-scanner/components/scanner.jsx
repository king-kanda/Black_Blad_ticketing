import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import React from 'react'
import { CameraView } from 'expo-camera'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCAN_AREA_SIZE = SCREEN_WIDTH * 0.7; // 70% of screen width

const Scanner = () => {
  return (
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
  )
}

const styles = StyleSheet.create({
   
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
  

export default Scanner
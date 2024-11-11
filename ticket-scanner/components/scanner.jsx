import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import React, { useState } from 'react'
import { CameraView } from 'expo-camera'
import TicketModal from './ticket-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCAN_AREA_SIZE = SCREEN_WIDTH * 0.7; // 70% of screen width

const Scanner = () => {

  const [ticket ,setTicket] = useState({})
  const [ticketModalVisible, setTicketModalVisible] = useState(false);


    //get tickets
    const fetchTickets = async (data) => {
        try {
            const response = await fetch(data);
        
            if (!response.ok) {
                console.log("Request failed with status:", response.status);
            }
        
            const ticket = await response.json(); // Assuming the response is JSON
            scanTicket(ticket)
        
        } catch (error) {
            console.error("Error fetching ticket data:", error);
        }
    }

    //scan ticket
    const scanTicket = async (ticket) => {
        try {
            const response = await fetch(`https://4ec8-41-80-116-93.ngrok-free.app/api/tickets/${ticket.id}/scan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                console.log("Request failed with status:", response.status);
                return;
            }

            const scannedTicket = await response.json(); // Assuming the response is JSON
            setTicket(scannedTicket)
            setTicketModalVisible(true)

        } catch (error) {
            console.log(error)
        }
    }
     
  return (
        <View style={styles.cameraContainer}>
              <CameraView 
                style={styles.camera} 
                facing="back"
                onBarcodeScanned={({data}) => {
                  setTimeout(async () => {
                    console.log(data)
                    fetchTickets(data) 
                  }, 0)
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

              {/* scanned ticket modal */}

              <TicketModal ticketModalVisible={ticketModalVisible} setTicketModalVisible={setTicketModalVisible}  ticket={ticket} />


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
import { View, Text, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import React  from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TicketDetails from './tickets';

const TicketModal = ({setTicketModalVisible , ticketModalVisible , ticket}) => {

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={ticketModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setTicketModalVisible(!ticketModalVisible);
    }}>
    <View className="flex flex-1 justify-end items-center">
        {/* modal wrapper */}
        <View className={`bg-white w-full h-[80vh] rounded-t-3xl  `} >
            {/* modal content */}
            <View className="flex  flex-row items-center justify-between border-b border-gray-200 py-4 px-4">
                <Text className="text-navy font-semibold text-xl" ></Text>
                <Pressable
                onPress={() => setTicketModalVisible(!ticketModalVisible)}>
                    <MaterialCommunityIcons name="window-close" size={24} color="gray" />
                </Pressable>
            </View>

          

            {/* display list */}
            <TicketDetails ticket={ticket} />

        </View>
    </View>
  </Modal>
  )
}



export default TicketModal
import { View, Text, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
import React  from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TicketDetails from './tickets';

const SearchModal = ({setModalVisible , modalVisible}) => {

  const [number, onChangeNumber] = React.useState('');

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View className="flex flex-1 justify-end items-center">
        {/* modal wrapper */}
        <View className={`bg-white w-full h-[80vh] rounded-t-3xl  `} >
            {/* modal content */}
            <View className="flex  flex-row items-center justify-between border-b border-gray-200 py-4 px-4">
                <Text className="text-navy font-semibold text-xl" >Scan ticket ID</Text>
                <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                    <MaterialCommunityIcons name="window-close" size={24} color="gray" />
                </Pressable>
            </View>

            {/* search  input */}
            <View className="w-full px-4 py-4 " >
                  <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5"
                   onChangeText={onChangeNumber}
                   value={number}
                   placeholder="Enter Ticket Id or Customer Name"
                  />
            </View>

            {/* display list */}
            <TicketDetails/>

        </View>
    </View>
  </Modal>
  )
}



export default SearchModal
import React from 'react';
import { View, Text, } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TicketDetails = ({ticket}) => {


  return (
    <View className="flex-1 bg-navy">
      <View className="p-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-xl font-semibold">Ticket Details</Text>
          {ticket?.scanned ? (
            <MaterialCommunityIcons name="check-circle" size={24} color="#22c55e" />
          ) : (
            <MaterialCommunityIcons name="ticket-confirmation" size={24} color="white" />
          )}
        </View>

        {/* Ticket Card */}
        <View className="bg-white rounded-xl p-6 shadow-lg">
          {/* Scan Status Banner */}
          <View className={`rounded-lg mb-4 p-2 ${ticket?.scanned ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <View className="flex-row items-center justify-center gap-2 space-x-2 gap-2">
              <MaterialCommunityIcons 
                name={ticket?.scanned ? "check-circle-outline" : "line-scan"} 
                size={20} 
                color={ticket?.scanned ? "#22c55e" : "#eab308"} 
              />
              <Text className={`font-medium ${ticket?.scanned ? 'text-green-700' : 'text-yellow-700'}`}>
                {ticket?.scanned ? 'Ticket Scanned' : 'Register Ticket'}
              </Text>
            </View>
          </View>

          {/* Ticket Details */}
          <View className="space-y-4">
            {/* Customer Name */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="account" size={20} color="#6B7280" />
                <Text className="text-gray-500">Customer Name</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.name || 'N/A'}</Text>
            </View>

            {/* Event Date */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
                <Text className="text-gray-500">Event Date</Text>
              </View>
              <Text className="text-navy font-semibold">
                {new Date(ticket?.event.event_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>

            {/* Event name */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="arrange-send-backward" size={20} color="#6B7280" />
                <Text className="text-gray-500">Event Name</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.event.name || 'N/A'}</Text>
            </View>

            {/* Location */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="map-marker" size={20} color="#6B7280" />
                <Text className="text-gray-500">Location</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.event.location || 'N/A'}</Text>
            </View>

            {/* Ticket ID */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="ticket-outline" size={20} color="#6B7280" />
                <Text className="text-gray-500">Ticket ID</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.id || 'N/A'}</Text>
            </View>

            {/* Ticket Type */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center gap-2 space-x-2">
                <MaterialCommunityIcons name="ticket-confirmation" size={20} color="#6B7280" />
                <Text className="text-gray-500">Ticket Type</Text>
              </View>
              <View className="bg-navy rounded-full px-3 py-1">
                <Text className="text-white font-medium">{ticket?.ticket_type.name || 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* Scan Timestamp if scanned */}
        
        </View>
      </View>
    </View>
  );
};

export default TicketDetails;
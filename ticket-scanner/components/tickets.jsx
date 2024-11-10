import React from 'react';
import { View, Text, } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TicketDetails = () => {
  // Example ticket data structure
  const ticket = {
    customerName: "John Doe",
    eventDate: "2024-11-15",
    location: "KICC Ground Floor",
    ticketId: "TKT-001-2024",
    ticketType: "VIP",
    isScanned: false
  };

  return (
    <View className="flex-1 bg-navy">
      <View className="p-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-white text-xl font-semibold">Ticket Details</Text>
          {ticket?.isScanned ? (
            <MaterialCommunityIcons name="check-circle" size={24} color="#22c55e" />
          ) : (
            <MaterialCommunityIcons name="ticket-confirmation" size={24} color="white" />
          )}
        </View>

        {/* Ticket Card */}
        <View className="bg-white rounded-xl p-6 shadow-lg">
          {/* Scan Status Banner */}
          <View className={`rounded-lg mb-4 p-2 ${ticket?.isScanned ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <View className="flex-row items-center justify-center space-x-2 gap-2">
              <MaterialCommunityIcons 
                name={ticket?.isScanned ? "check-circle-outline" : "line-scan"} 
                size={20} 
                color={ticket?.isScanned ? "#22c55e" : "#eab308"} 
              />
              <Text className={`font-medium ${ticket?.isScanned ? 'text-green-700' : 'text-yellow-700'}`}>
                {ticket?.isScanned ? 'Ticket Scanned' : 'Register Ticket'}
              </Text>
            </View>
          </View>

          {/* Ticket Details */}
          <View className="space-y-4">
            {/* Customer Name */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="account" size={20} color="#6B7280" />
                <Text className="text-gray-500">Customer Name</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.customerName || 'N/A'}</Text>
            </View>

            {/* Event Date */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="calendar" size={20} color="#6B7280" />
                <Text className="text-gray-500">Event Date</Text>
              </View>
              <Text className="text-navy font-semibold">
                {new Date(ticket?.eventDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </View>

            {/* Location */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="map-marker" size={20} color="#6B7280" />
                <Text className="text-gray-500">Location</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.location || 'N/A'}</Text>
            </View>

            {/* Ticket ID */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="ticket-outline" size={20} color="#6B7280" />
                <Text className="text-gray-500">Ticket ID</Text>
              </View>
              <Text className="text-navy font-semibold">{ticket?.ticketId || 'N/A'}</Text>
            </View>

            {/* Ticket Type */}
            <View className="flex-row items-center justify-between py-2">
              <View className="flex-row items-center space-x-2">
                <MaterialCommunityIcons name="ticket-confirmation" size={20} color="#6B7280" />
                <Text className="text-gray-500">Ticket Type</Text>
              </View>
              <View className="bg-navy rounded-full px-3 py-1">
                <Text className="text-white font-medium">{ticket?.ticketType || 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* Scan Timestamp if scanned */}
          {ticket?.isScanned && ticket?.scanTimestamp && (
            <View className="mt-6 pt-4 border-t border-gray-200">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-2">
                  <MaterialCommunityIcons name="clock-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-500">Scanned At</Text>
                </View>
                <Text className="text-navy font-semibold">
                  {new Date(ticket?.scanTimestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TicketDetails;
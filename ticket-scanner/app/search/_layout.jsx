
import React from "react";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'red' ,
      tabBarInactiveTintColor: 'white',
      tabBarStyle: {
        height: 65,  
        paddingBottom: 5, 
        paddingTop: 5,    
        backgroundColor: '#03071e', 
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,      
        paddingBottom: 4,  
      },
      
      }} >
      <Tabs.Screen name="scanner"  options={{
        headerShown: false,
        title:"Scan Tickets",
        tabBarIcon:  ({color}) =>  <MaterialCommunityIcons name="line-scan" size={24} color={color} />, 
      }}/>
       <Tabs.Screen name="issue-ticket"  options={{
        headerShown: false ,
        title:"Gate Tickets",
        tabBarIcon:  ({color}) =>  <MaterialCommunityIcons name="ticket" size={24} color={color} />, 
      }}/>
       <Tabs.Screen name="tickets-list"  options={{
        headerShown: false ,
        title:"Ticket List",
        tabBarIcon:  ({color}) =>  <MaterialCommunityIcons name="ticket-confirmation" size={24} color={color} />, 
      }}/>
    </Tabs>
  );
}

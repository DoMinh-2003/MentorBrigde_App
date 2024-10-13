import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';

export default function oauthredirect() {
const navigate = useNavigation();

useEffect(() => {
  navigate.navigate("(tabs)");
}, []); 

return <></>;
}
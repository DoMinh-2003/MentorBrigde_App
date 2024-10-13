import { View, Text } from 'react-native'
import React from 'react'
import useApi from '@/hooks/useApi';


const Authentication = () => {
    const { callApi, loading } = useApi();

   

   const loginGoogle = async (accessToken:string) => {
    return await callApi("post","login-google",{token: accessToken},"Login Google Successfully")
   }
  
    return { loginGoogle, loading };
}

export default Authentication

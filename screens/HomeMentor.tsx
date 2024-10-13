import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context'

const HomeMentor = () => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{paddingTop: insets.top}}>
      <Text>Trang chủ</Text>
    </View>
  )
}

export default HomeMentor
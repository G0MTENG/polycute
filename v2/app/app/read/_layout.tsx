import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'

export default function Read() {
  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView style={[styles.container, { paddingTop: headerHeight }]}>
      <Text>읽기 페이지</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

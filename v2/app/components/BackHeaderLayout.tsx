import { SafeAreaView, StyleSheet } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { PropsWithChildren } from 'react'

export const BackHeaderLayout = ({ children }: PropsWithChildren) => {
  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView style={[styles.container, { paddingTop: headerHeight }]}>{children}</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
})

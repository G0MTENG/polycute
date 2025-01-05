import { StyleSheet, Text, View } from 'react-native'
import { Button } from './Button'
import { useModalContext } from './modalProvider'

export const InfoModalContent = () => {
  const { close } = useModalContext()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>애플리케이션 소개</Text>
      <Text>마크다운을 통해 메모를 저장하고</Text>
      <Text>간편하게 볼 수 있는 애플리케이션입니다.</Text>
      <Button onPress={close}>확인</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
})

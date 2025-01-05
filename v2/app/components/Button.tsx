import { PropsWithChildren } from 'react'
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

export const Button = ({ children, ...props }: PropsWithChildren<PressableProps>) => {
  return (
    <Pressable {...props} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#805333',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 12,
  },
})

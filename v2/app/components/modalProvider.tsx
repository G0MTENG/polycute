import { createContext, useContext } from 'react'
import { Modal, StyleSheet, Pressable } from 'react-native'
import { useModal } from '@/hooks/useModal'

type ModalContextType = Omit<ReturnType<typeof useModal>, 'modalContent'>
const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, close, open, modalContent } = useModal()

  return (
    <ModalContext.Provider value={{ isOpen, close, open }}>
      {children}
      <Modal animationType='slide' transparent={true} visible={isOpen} onRequestClose={close}>
        <Pressable style={styles.overlay} onPress={close}>
          {modalContent}
        </Pressable>
      </Modal>
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const value = useContext(ModalContext)

  if (!value) {
    throw new Error('ModalProvider를 찾을 수 없습니다.')
  }

  return value
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
})

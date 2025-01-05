import React, { useState } from 'react'

const useModalContent = () => {
  return useState<React.ReactNode>(<></>)
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useModalContent()

  const close = () => {
    setIsOpen(false)
  }

  const open = (content: React.ReactNode) => {
    setModalContent(content)
    setIsOpen(true)
  }

  return {
    modalContent,
    isOpen,
    close,
    open,
  }
}

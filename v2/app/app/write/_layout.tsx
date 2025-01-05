import { useUserId } from '@/components'
import { BackHeaderLayout } from '@/components/BackHeaderLayout'
import { WEBVIEW_URI } from '@/constants/uris'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native'

export default function Write() {
  const [userId] = useUserId()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [document, setDocument] = useState('')

  const handleSubmit = async () => {
    if (!title || !document || !userId) {
      return
    }

    const response = await fetch(`${WEBVIEW_URI}/api/acorns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title,
        document,
      }),
    })

    if (response.ok) {
      setTitle('')
      setDocument('')
      const { id } = await response.json()
      router.replace({
        pathname: '../read/[id]',
        params: {
          id,
        },
      })
    }
  }

  return (
    <BackHeaderLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder='제목을 입력하세요.'
          style={styles.input}
        />
        <Text style={styles.label}>내용</Text>
        <TextInput
          value={document}
          onChangeText={setDocument}
          placeholder='내용을 입력해주세요. (마크다운 문법)'
          style={[styles.input, styles.textarea]}
          multiline
          textAlignVertical='top'
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>작성하기</Text>
        </Pressable>
      </ScrollView>
    </BackHeaderLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    flex: 1,
    minHeight: 120,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#422223',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    padding: 12,
  },
})

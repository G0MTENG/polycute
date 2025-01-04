import { UserIdProvider } from '@/components'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <UserIdProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false, title: '' }} />
        <Stack.Screen
          name='read'
          options={{
            headerTitle: '글읽기',
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen
          name='write'
          options={{
            headerTitle: '',
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'transparent',
            },
          }}
        />
      </Stack>
    </UserIdProvider>
  )
}

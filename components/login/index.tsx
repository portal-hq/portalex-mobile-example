import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Input from '@components/shared/text-input'
import SignIn from '@components/login/auth/signin'
import SignUp from '@components/login/auth/signup'
import PortalEx from '@components/login/images/portalex-purple'

interface LoginProps {
  setUser: Dispatch<SetStateAction<AuthResult | null>>
}

const Login: FC<LoginProps> = ({ setUser }) => {
  const [username, setUsername] = useState<string>('')

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <PortalEx />
      </View>
      <Input
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.textInput}
        value={username}
      />
      <SignIn setUser={setUser} username={username} />
      <SignUp setUser={setUser} username={username} />
    </View>
  )
}

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height,
    paddingHorizontal: 25,
    paddingVertical: 100,
    width,
  },
  logo: {
    alignItems: 'center',
    borderBottomColor: '#F4F5F5',
    borderBottomWidth: 1,
    justifyContent: 'center',
    justifyItems: 'center',
    marginBottom: 25,
    paddingBottom: 25,
    width: '100%',
  },
  textInput: {
    borderRadius: 10,
    height: 60,
    width: '100%',
  },
})

export default Login

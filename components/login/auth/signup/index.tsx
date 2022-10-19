import React, { Dispatch, FC, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native'
import { signUp } from '@lib/custodian'
import PrimaryButton from '@components/shared/buttons/primary'

interface SignUpProps {
  setUser: Dispatch<SetStateAction<AuthResult | null>>
  username: string
}

const SignUp: FC<SignUpProps> = ({ setUser, username }) => {
  const handleSignUp = async () => {
    try {
      const user = await signUp(username)
      setUser({ ...user, newUser: true })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={{ marginTop: 20 }}>
      <PrimaryButton
        disabled={!username || !username.length}
        onPress={handleSignUp}
        style={styles.button}
        title="Create account"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    color: '#6E2ADA',
    padding: 10,
  },
})

export default SignUp

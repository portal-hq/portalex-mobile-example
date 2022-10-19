import React, {Dispatch, FC, SetStateAction} from 'react'
import {Button, View} from 'react-native'
import {signIn} from '../../../../lib/custodian'
import PrimaryButton from '../../../shared/buttons/primary'

interface SignInProps {
  setUser: Dispatch<SetStateAction<AuthResult | null>>
  username: string
}

const SignIn: FC<SignInProps> = ({setUser, username = ''}) => {
  const handleSignIn = async () => {
    try {
      const user = await signIn(username)
      setUser(user)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <View style={{marginTop: 20}}>
      <PrimaryButton
        disabled={!username || !username.length}
        onPress={handleSignIn}
        title="Sign In"
      />
    </View>
  )
}

export default SignIn

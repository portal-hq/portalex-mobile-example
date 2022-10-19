import React, { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const Input: FC<TextInputProps> = ({ style = {}, ...rest }) => {
  return (
    <TextInput
      {...rest}
      style={{
        ...styles.textInput,
        ...(typeof style === 'object' ? style : {}),
      }}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#F4F5F5',
    borderRadius: 17.5,
    color: '#52565B',
    height: 35,
    paddingBottom: 7.5,
    paddingLeft: 17.5,
    paddingRight: 17.5,
    paddingTop: 7.5,
  },
})

export default Input

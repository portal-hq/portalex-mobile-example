import React, { FC } from 'react'
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native'

interface PrimaryButtonProps extends PressableProps {
  title: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  disabled,
  style = {},
  title,
  ...rest
}) => {
  const { disabled: disabledTextStyle = {} } = {}

  return (
    <Pressable
      {...rest}
      style={{
        ...styles.button,
        ...(disabled ? styles.disabledButton : {}),
        ...(typeof style === 'object' ? style : {}),
      }}>
      <Text
        style={{
          ...styles.text,
          color:
            typeof style === 'object' && (style as TextStyle).color
              ? (style as TextStyle).color
              : styles.text.color,
          ...(disabled ? styles.disabledText : {}),
          ...(disabled ? disabledTextStyle : {}),
        }}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6E2ADA',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#CECFD0',
  },
  disabledText: {
    color: '#6B6E73',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
})

export default PrimaryButton

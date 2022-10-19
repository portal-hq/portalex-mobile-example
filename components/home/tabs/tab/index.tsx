import React, { FC } from 'react'
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface TabProps {
  active: boolean
  icon: FC
  label: string
  onPress: () => void
  style?: ViewStyle
}

const Tab: FC<TabProps> = ({
  active,
  icon: Icon,
  label,
  onPress,
  style = {},
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon />
        </View>
        <Text
          style={{
            ...styles.label,
            color: active ? '#6E2ADA' : '#83868A',
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 60,
    justifyContent: 'center',
    padding: 10,
    width: 120,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    marginTop: 5,
    textAlign: 'center',
  },
})

export default Tab

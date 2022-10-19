import React, { FC } from 'react'
import { SetStateAction } from 'react'
import { Dispatch } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { View } from 'react-native'
import { Views } from '../index'
import Tab from './tab'
import BrowserActive from './icons/icon-browser-active'
import BrowserInactive from './icons/icon-browser-inactive'
import NativeActve from './icons/icon-native-active'
import NativeInactive from './icons/icon-native-inactive'

const { width } = Dimensions.get('window')

interface TabsProps {
  setView: Dispatch<SetStateAction<Views>>
  view: Views
}

const Tabs: FC<TabsProps> = ({ setView, view }) => {
  return (
    <View style={[styles.container, styles.bottom]}>
      <Tab
        active={view === Views.Browser}
        icon={view === Views.Browser ? BrowserActive : BrowserInactive}
        label="Browser"
        onPress={() => setView(Views.Browser)}
      />
      <Tab
        active={view === Views.Native}
        icon={view === Views.Native ? NativeActve : NativeInactive}
        label="Native"
        onPress={() => setView(Views.Native)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottom: {
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderTopColor: '#F4F5F5',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    height: 80,
    padding: 10,
    width,
    zIndex: 10,
  },
})

export default Tabs

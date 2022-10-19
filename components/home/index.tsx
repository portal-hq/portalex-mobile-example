import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Browser } from '@portal-hq/components'

import Native from './native'
import Tabs from './tabs'

export enum Views {
  Browser = 'Browser',
  Native = 'Native',
}

const Home: FC = () => {
  const [currentView, setCurrentView] = useState<Views>(Views.Browser)

  const view = useMemo(() => {
    return currentView
  }, [currentView])

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        {view === Views.Browser && <Browser />}
        {view === Views.Native && <Native />}
      </View>

      <View>
        <Tabs setView={setCurrentView} view={view} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  viewContainer: {
    flex: 1,
  },
  walletIcon: {
    alignItems: 'center',
    backgroundColor: '#EDE3FE',
    borderRadius: 25,
    bottom: 25,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 25,
    width: 50,
    zIndex: 1,
  },
})

export default Home

import React, { FC, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { BackupMethods, Portal, PortalContextProvider } from '@portal-hq/core'
import GDRIVEStorage from '@portal-hq/gdrive-storage'
import ICLOUDStorage from '@portal-hq/icloud-storage'
import Keychain from '@portal-hq/keychain'
import { Setup, Screens } from '@portal-hq/components'

import { ANDROID_CLIENT_ID, ALCHEMY_API_KEY, IOS_CLIENT_ID } from '@config'
import { UserContextProvider } from '@context/user'

import Login from '@components/login'
import Home from '@components/home'
import { getBalance, storeCipherText, transferFunds } from '@lib/custodian'

export interface SigningRequest {
  method: string
  params?: any
}

// Please uncomment the backup method you would you configured your app for.
const backupMethod = BackupMethods.iCloud
const backupMethodConfig = { [backupMethod]: new ICLOUDStorage() }

// const backupMethod = BackupMethods.GoogleDrive
// const backupMethodConfig = {
//   [backupMethod]: new GDRIVEStorage({
//     androidClientId: ANDROID_CLIENT_ID!,
//     iosClientId: IOS_CLIENT_ID!,
//     folder: 'PORTAL_MPC_DEMO',
//   }),
// }
const chainId = 5
const chain = 'goerli'

enum Pages {
  Setup = 'Setup',
  Home = 'Home',
}
const App: FC = () => {
  const [initialized, setInitialize] = useState<boolean>(false)
  const [mpcReady, setMpcReady] = useState<boolean>(false)
  const [portal, setPortal] = useState<Portal>()
  const [portalReady, setPortalReady] = useState<boolean>(false)
  const [user, setUser] = useState<AuthResult | null>(null)
  const [page, setPage] = useState<Pages>(Pages.Setup)

  // Initialize Portal when a user signs in
  useEffect(() => {
    if (user && !initialized) {
      setInitialize(true)
      ;(async () => {
        if (user.newUser) {
          const keychain = new Keychain()

          await keychain.deleteAddress()
          await keychain.deleteDkgResult()
        }

        const portal = new Portal({
          apiKey: user.clientApiKey,
          backup: backupMethodConfig,
          chainId,
          gatewayConfig: {
            [chainId]: `https://eth-${chain}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
          },
          isSimulator: DeviceInfo.isEmulatorSync(),
          keychain: new Keychain(),
        })

        setPortal(portal)
      })()
    }
  }, [user])

  // Let the app know if Portal MPC is ready to go
  useEffect(() => {
    if (portal) {
      ;(async () => {
        const mpcReady = await portal.mpc.isReady()

        console.log(`Portal Ready!`)
        setPortalReady(true)
        setMpcReady(mpcReady)
      })()
    }
  }, [portal])

  const transfer = async (
    toAddress: string,
    amount: number,
    chainId: number,
  ) => {
    const res = await transferFunds(
      user!.exchangeUserId,
      amount,
      chainId,
      toAddress,
    )
    const { txHash } = await res.json()

    return { txHash }
  }

  const getExchangeBalance = async (chainId: number) => {
    const balance = await getBalance(user!.exchangeUserId, chainId)
    return { balance: Number(balance) }
  }

  return (
    <>
      <StatusBar />
      <PortalContextProvider value={portal as Portal}>
        <UserContextProvider value={user as AuthResult}>
          {typeof user !== 'undefined' && !user ? (
            <Login setUser={setUser} />
          ) : (
            portal &&
            portalReady && (
              <SafeAreaView>
                <View style={{ width: '100%', height: '100%' }}>
                  {page === Pages.Setup && (
                    <Setup
                      transfer={transfer}
                      getBalance={getExchangeBalance}
                      sendCipherText={async (cipherText: string) => {
                        await storeCipherText(user.exchangeUserId, cipherText)
                      }}
                      // This prop can be used for starting on a specific screen within the setup flow
                      initialScreen={Screens.AccountStart}
                      enableFaceId={false}
                      storageMethod={backupMethod}
                      onBackupFinish={() => {
                        setPage(Pages.Home)
                      }} // This prop can be used to navigate to a different screen after the backup is complete
                    />
                  )}
                  {page === Pages.Home && <Home />}
                </View>
              </SafeAreaView>
            )
          )}
        </UserContextProvider>
      </PortalContextProvider>
    </>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    flex: 1,
  },
})

export default App

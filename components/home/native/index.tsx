import React, { FC, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { BigNumber } from 'ethers'
import { usePortal } from '@portal-hq/core'

/**
 * In this example, we're using the `ethers` package.
 * This is not included with any of the Portal packages.
 *
 * If you'd like to run this example yourself, you should
 * manually install the `ethers` package.
 */

const Native: FC = () => {
  const portal = usePortal()
  const [toAddress, setToAddress] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')

  const handleSend = async () => {
    // Build a transaction to be sent
    const transaction = {
      data: '',
      to: toAddress,
      value: BigNumber.from('1').toHexString(),
      gas: '0x6000',
      from: await portal.mpc.address,
    }

    // Use the Portal Web3 Provider to make requests
    const txHash = await portal.provider.request({
      method: 'eth_sendTransaction',
      params: transaction,
    })

    setTxHash(txHash)
    setToAddress('')
  }

  return (
    <View>
      <Text>Send 1 WEI</Text>
      <TextInput
        onChangeText={setToAddress}
        placeholder="Enter an address"
        value={toAddress}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          disabled={!portal || !toAddress || !toAddress.length}
          onPress={handleSend}
          title="Send 1 Wei"
        />
      </View>

      {txHash && txHash.length > 0 && (
        <View>
          <Text>Successfully sent transaction!</Text>
          <Text>TXHash: {txHash}</Text>
        </View>
      )}
    </View>
  )
}

export default Native

import axios from 'axios'
import { CUSTODIAN_SERVER_URL } from '../../config'

export const getAddress = async (userId: string): Promise<AddressResult> => {
  const custodianApiUrl = CUSTODIAN_SERVER_URL

  const { data: result } = await axios.get<AddressResult>(
    `${custodianApiUrl}/mobile/${userId}/address`
  )

  return result
}

export const getWalletId = async (userId: string): Promise<WalletResult> => {
  const custodianApiUrl = CUSTODIAN_SERVER_URL

  const { data: result } = await axios.get<WalletResult>(
    `${custodianApiUrl}/mobile/${userId}/walletid`
  )

  return result
}

// export const login = async (userId: string): Promise<AuthResult> => {}

export const refreshBalance = async (
  userId: string,
  chainId: number
): Promise<BalanceResult> => {
  const { data: result } = await axios.post<BalanceResult>(
    `${CUSTODIAN_SERVER_URL}/mobile/${userId}/refresh`,
    { chainId }
  )

  return result
}

/*
 * Calls the sign up endpoint on the mock exchange server.
 */
export const signUp = async (username: string): Promise<AuthResult> => {
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/signup`)

  const { data: result, status } = await axios.post<AuthResult>(
    `${CUSTODIAN_SERVER_URL}/mobile/signup`,
    {
      username,
    }
  )

  if (status === 401) {
    throw new Error(`User ${username} does not exist yet.`)
  } else if (status !== 200) {
    throw new Error(`Unknown login error.`)
  }

  return result
}

/*
 * Calls the login endpoint on the mock exchange server.
 */
export const signIn = async (username: string): Promise<AuthResult> => {
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/login`)

  const { data: result, status } = await axios.post<AuthResult>(
    `${CUSTODIAN_SERVER_URL}/mobile/login`,
    {
      username,
    }
  )

  if (status === 401) {
    throw new Error(`User ${username} does not exist yet.`)
  } else if (status !== 200) {
    throw new Error(`Unknown login error.`)
  }

  return result
}

/*
 * Calls the transfer endpoint on the mock exchange server.
 */
export const transferFunds = async (
  userId: string,
  amount: number,
  chainId: number,
  address: string
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      exchangeUserId: userId,
      amount,
      chainId,
      address,
    }),
  }
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/${userId}/transfer`)

  return fetch(
    `${CUSTODIAN_SERVER_URL}/mobile/${userId}/transfer`,
    requestOptions
  )
}

/*
 * Calls the balance endpoint on the mock exchange server.
 */
export const getBalance = async (userId: string, chainId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chainId,
    }),
  }
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/${userId}/balance/refresh`)

  const data = await fetch(
    `${CUSTODIAN_SERVER_URL}/mobile/${userId}/balance/refresh`,
    requestOptions
  )
    .then((res) => {
      return res.json()
    })
    .catch((e) => {
      console.error(e)
    })

  return data.balance || 0
}

/*
 * Calls the cipher-text endpoint on the mock exchange server.
 */
export const getCipherText = async (userId: string) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/${userId}/cipher-text/fetch`)

  const data = await fetch(
    `${CUSTODIAN_SERVER_URL}/mobile/${userId}/cipher-text/fetch`,
    requestOptions
  )
    .then((res) => {
      return res.json()
    })
    .catch((e) => {
      console.error(e)
    })

  return data.cipherText || ''
}

/*
 * Calls the cipher-text/fetch endpoint on the mock exchange server.
 */
export const storeCipherText = async (userId: string, cipherText: string) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cipherText,
    }),
  }
  console.log(`${CUSTODIAN_SERVER_URL}/mobile/${userId}/cipher-text`)

  const data = await fetch(
    `${CUSTODIAN_SERVER_URL}/mobile/${userId}/cipher-text`,
    requestOptions
  )
    .then((res) => {
      return res
    })
    .catch((e) => {
      console.error(e)
    })

  return data
}

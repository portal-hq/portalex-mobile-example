import Config from 'react-native-config'

export const ANDROID_CLIENT_ID = Config.ANDROID_CLIENT_ID

export const ALCHEMY_API_KEY = Config.ALCHEMY_API_KEY

export const IOS_CLIENT_ID = Config.IOS_CLIENT_ID

export const CUSTODIAN_SERVER_URL =
  Config.CUSTODIAN_SERVER_URL ||
  'https://staging-portalex-mpc-service.onrender.com'

export const INFURA_ID = Config.INFURA_ID || ''

interface AddressResult {
  address: string
}

interface AuthResult {
  address: string
  clientApiKey: string
  exchangeUserId: string
  newUser?: boolean
}

interface BalanceResult {
  balance: string
}

interface WalletResult {
  walletId: string
}

import { PolkadotWallet } from 'interfaces'

export const actions = {
  loginPolkadot: (value: PolkadotWallet) => ({
    type: 'USER_LOGIN_POLKADOT',
    value: value,
  }),
}

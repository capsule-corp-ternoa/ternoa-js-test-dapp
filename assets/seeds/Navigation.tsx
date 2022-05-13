import Metamask from 'assets/svg/Providers/Metamask'
import WalletConnect from 'assets/svg/Providers/WalletConnect'

export default function Navigation() {
  const navItems = [
    {
      src: 'https://www.ternoa.com',
      text: 'Ternoa.com',
      title: 'Ternoa website',
    },
    {
      src: 'https://explorer.ternoa.com/',
      text: 'Ternoa Explorer',
      title: 'Ternoa Explorer',
    },
    {
      src: 'https://bridge.ternoa.network/',
      text: 'Ternoa Bridge',
      title: 'Ternoa Bridge',
    },
  ]

  const web3Providers = [
    {
      color: 'dark',
      icon: <Metamask />,
      size: 'medium',
      text: 'Metamask',
      variant: 'rounded',
    },
    {
      color: 'dark',
      icon: <WalletConnect />,
      size: 'medium',
      text: 'Wallet Connect',
      variant: 'rounded',
    },
  ]
  return { navItems, web3Providers }
}

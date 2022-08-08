import Metamask from 'assets/svg/Providers/Metamask'
import WalletConnect from 'assets/svg/Providers/WalletConnect'

export default function HeaderNavigation() {
  const projectName = 'ternoa-js'
  const navItems = [
    {
      href: '/app/NFT/CreateNFT',
      label: 'Helpers',
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
  return { projectName, navItems, web3Providers }
}

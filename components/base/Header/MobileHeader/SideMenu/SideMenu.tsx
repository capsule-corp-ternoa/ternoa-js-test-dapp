import { useState } from 'react'
import Link from 'next/link'
import { useAppSelector } from 'redux/hooks'
import dynamic from 'next/dynamic'
const Identicon = dynamic(() => import('@polkadot/react-identicon'), { ssr: false })

import { ILinks } from '../../interfaces'
import { middleEllipsis } from 'utils/strings'
import PolkadotModal from 'components/base/Modals/PolkadotModal'
import Close from 'assets/svg/Components/Close'
import MobileFooter from 'components/base/MobileFooter'
import Button, { AnchorButton } from 'components/ui/Button/Button'

import Polkadot from 'assets/svg/Providers/Polkadot'
import mainStyles from '../MobileHeader.module.scss'
import styles from './SideMenu.module.scss'
import NetworkPill from 'components/ui/NetworkPill'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

type ExpandedNominalSetState = React.Dispatch<React.SetStateAction<boolean>>

interface Props {
  ternoaLogo: React.ReactNode
  projectName: string
  isExpanded: boolean
  setIsExpanded: ExpandedNominalSetState
  links?: ILinks[]
}

const SideMenu = ({ ternoaLogo, projectName, isExpanded, setIsExpanded, links }: Props) => {
  const [isPolkadotModalOpen, setIsPolkadotModalOpen] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)
  const [NFT, setNFT] = useState(false)
  const [collection, setCollection] = useState(false)
  const [marketplace, setMarketplace] = useState(false)
  const handleClick = (id: string) => {
    if (id == 'NFT') setNFT(!NFT)
    else if (id == 'collection') setCollection(!collection)
    else setMarketplace(!marketplace)
  }
  return (
    <aside className={`container ${styles.root} ${isExpanded && styles.expanded}`}>
      <div className={`sidemenu-container ${styles.radialGradientBg}`}>
        <div>
          <div className={`wrapper ${mainStyles.nav}`}>
            <Link href="/">
              <a className={mainStyles.logo} title={projectName}>
                {ternoaLogo}
                <div className={mainStyles.logoTitle}>{projectName}</div>
              </a>
            </Link>
            <button onClick={() => setIsExpanded((prevState) => !prevState)} title="Close menu">
              <Close className={mainStyles.button} />
            </button>
          </div>
          {links && (
            <div className={`wrapper ${styles.links}`}>
              {links.map((item) => (
                <AnchorButton color="dark" href={item.href} size="medium" variant="rectangle" text={item.label} title={item.label} key={item.label} />
              ))}
            </div>
          )}
          <div className={styles.provider}>
            {user && user.polkadotWallet ? (
              <Button
                color="dark"
                icon={user.polkadotWallet && <Identicon value={user.polkadotWallet?.address} size={24} theme="polkadot" />}
                size="small"
                text={user.polkadotWallet && middleEllipsis(user.polkadotWallet?.address)}
                variant="rounded"
                onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
              />
            ) : (
              <Button
                color="dark"
                icon={<Polkadot />}
                size="small"
                text="Connect"
                variant="rounded"
                onClick={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)}
              />
            )}
            <div className={styles.network}>
              <NetworkPill />
            </div>

            <div className="sidebar-wrapper">
              <div style={{ minWidth: '300px' }}>
                <List
                  sx={{ width: '100%', bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
                >
                  <ListItemButton className="list-title-btn" onClick={() => handleClick('NFT')}>
                    NFT
                    {NFT ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={NFT} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/CreateNFT">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Create NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/BurnNFT">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Burn NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/DelegateNFT">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Delegate NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/SetRoyalty">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Set Royalty</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/TransferNFT">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Transfer NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/NFT/AddNftToCollection">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Add NFT To Collection</a>
                        </Link>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton className="list-title-btn" onClick={() => handleClick('collection')}>
                    Collection
                    {collection ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={collection} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Collection/CreateCollection">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Create Collection</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Collection/LimitCollection">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Limit Collection</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Collection/CloseCollection">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Close Collection</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Collection/BurnCollection">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Burn Collection</a>
                        </Link>
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton className="list-title-btn" onClick={() => handleClick('marketplace')}>
                    Marketplace
                    {marketplace ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={marketplace} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/CreateNftMarketplace">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Create Marketplace </a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/SetNftMarketplaceConfiguration">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Set Marketplace Configuration </a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/SetNftMarketplaceOwner">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Set Marketplace Owner </a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/SetNftMarketplaceKind">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Set Marketplace Kind </a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/ListNft">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>List NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/UnlistNft">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Unlist NFT</a>
                        </Link>
                      </ListItemButton>
                      <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
                        <Link href="/app/Marketplace/BuyNft">
                          <a onClick={() => setIsExpanded((prevState) => !prevState)}>Buy NFT</a>
                        </Link>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
            </div>
          </div>
        </div>
        <MobileFooter projectName={projectName} isTopBorder={true} isSocials={true} />
      </div>
      {isPolkadotModalOpen && <PolkadotModal isOpen={isPolkadotModalOpen} closeModal={() => setIsPolkadotModalOpen(!isPolkadotModalOpen)} />}
    </aside>
  )
}

export default SideMenu

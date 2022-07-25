import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <SubMenu title="NFT">
          <Link href="/app/NFT/CreateNFT">
            <MenuItem>Create NFT</MenuItem>
          </Link>
          <Link href="/app/NFT/BurnNFT">
            <MenuItem>Burn NFT</MenuItem>
          </Link>
          <Link href="/app/NFT/DelegateNFT">
            <MenuItem>Delegate NFT</MenuItem>
          </Link>
          <Link href="/app/NFT/SetRoyalty">
            <MenuItem>Set Royalty</MenuItem>
          </Link>
          <Link href="/app/NFT/TransferNFT">
            <MenuItem>Transfer NFT</MenuItem>
          </Link>
          <Link href="/app/NFT/AddNftToCollection">
            <MenuItem>Add NFT To Collection</MenuItem>
          </Link>
        </SubMenu>
        <SubMenu title="Collection">
          <Link href="/app/Collection/CreateCollection">
            <MenuItem>Create Collection</MenuItem>
          </Link>
          <Link href="/app/Collection/LimitCollection">
            <MenuItem>Limit Collection</MenuItem>
          </Link>
          <Link href="/app/Collection/CloseCollection">
            <MenuItem>Close Collection</MenuItem>
          </Link>
          <Link href="/app/Collection/BurnCollection">
            <MenuItem>Burn Collection</MenuItem>
          </Link>
        </SubMenu>
      </Menu>
    </ProSidebar>
  )
}

export default Sidebar

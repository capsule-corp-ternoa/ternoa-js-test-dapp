import { useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { Typography } from '@mui/material'

export default function NestedList() {
  const [NFT, setNFT] = useState(false)
  const [collection, setCollection] = useState(false)
  const [marketplace, setMarketplace] = useState(false)

  const handleClick = (id: string) => {
    switch (id) {
      case 'NFT':
        setNFT((prevState) => !prevState)
        break
      case 'collection':
        setCollection((prevState) => !prevState)
        break
      case 'marketplace':
        setMarketplace((prevState) => !prevState)
        break
      default:
        break
    }
  }

  return (
    <List
      sx={{ width: '200px', backgroundColor: '#0e0e23' }}
      component="aside"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
    >
      <ListItemButton onClick={() => handleClick('NFT')} sx={{ justifyContent: 'space-between' }}>
        <Typography fontFamily="Airbnb Cereal App Bold">NFT</Typography>
        {NFT ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={NFT} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/CreateNFT">
              <Typography>Create NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/BurnNFT">
              <Typography>Burn NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/DelegateNFT">
              <Typography>Delegate NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/SetRoyalty">
              <Typography>Set Royalty</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/TransferNFT">
              <Typography>Transfer NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/AddNftToCollection">
              <Typography>Add NFT to Collection</Typography>
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick('collection')} sx={{ justifyContent: 'space-between' }}>
        <Typography fontFamily="Airbnb Cereal App Bold">Collection</Typography>
        {collection ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collection} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/CreateCollection">
              <Typography>Create Collection</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/LimitCollection">
              <a title="Limit Collection">
                <Typography>Limit Collection</Typography>
              </a>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/CloseCollection">
              <Typography>Close Collection</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/BurnCollection">
              <Typography>Burn Collection</Typography>
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick('marketplace')} sx={{ justifyContent: 'space-between' }}>
        <Typography fontFamily="Airbnb Cereal App Bold">Marketplace</Typography>
        {marketplace ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={marketplace} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/CreateNftMarketplace">
              <Typography>Create Marketplace</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/SetNftMarketplaceConfiguration">
              <Typography>Set Marketplace Configuration</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/SetNftMarketplaceOwner">
              <Typography>Set Marketplace Owner</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/SetNftMarketplaceKind">
              <Typography>Set Marketplace Kind</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/ListNft">
              <Typography>List NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/UnlistNft">
              <Typography>Unlist NFT</Typography>
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Marketplace/BuyNft">
              <Typography>Buy NFT</Typography>
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'

export default function NestedList() {
  const [NFT, setNFT] = React.useState(false)
  const [collection, setCollection] = React.useState(false)
  const [marketplace, setMarketplace] = React.useState(false)
  const handleClick = (id: string) => {
    if (id == 'NFT') setNFT(!NFT)
    else if (id == 'collection') setCollection(!collection)
    else setMarketplace(!marketplace)
  }

  return (
    <List
      sx={{ width: '200px', backgroundColor: '#0e0e23' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
    >
      <ListItemButton onClick={() => handleClick('NFT')}>
        NFT
        {NFT ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={NFT} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/CreateNFT">Create NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/BurnNFT">Burn NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/DelegateNFT">Delegate NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/SetRoyalty">Set Royalty</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/TransferNFT">Transfer NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/NFT/AddNftToCollection">Add NFT To Collection</Link>
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
            <Link href="/app/Collection/CreateCollection">Create Collection</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/Collection/LimitCollection">Limit Collection</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/Collection/CloseCollection">Close Collection</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="/app/Collection/BurnCollection">Burn Collection</Link>
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
            <Link href="#">Create Marketplace </Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">Set Marketplace Configuration </Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">Set Marketplace Owner </Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">Set Marketplace Kind </Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">List NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">Unlist NFT</Link>
          </ListItemButton>
          <ListItemButton className="list-section-btn" sx={{ pl: 4 }}>
            <Link href="#">Buy NFT</Link>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

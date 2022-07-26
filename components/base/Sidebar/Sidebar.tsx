import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'

type TTestMode = 'NFT' | 'collection' | 'marketplace'

export default function NestedList() {
  const [open, setOpen] = React.useState(true)
  const [mode, setMode] = React.useState<TTestMode>('NFT')
  const handleClick = (id: TTestMode) => {
    setMode(id)
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Test Show-cases
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleClick('NFT')}>
        NFT
        {mode == 'NFT' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={mode == 'NFT'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/CreateNFT">Create NFT</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/BurnNFT">Burn NFT</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/DelegateNFT">Delegate NFT</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/SetRoyalty">Set Royalty</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/TransferNFT">Transfer NFT</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/NFT/AddNftToCollection">Add NFT To Collection</Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick('collection')}>
        Collection
        {mode == 'collection' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={mode == 'collection'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/CreateCollection">Create Collection</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/LimitCollection">Limit Collection</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/CloseCollection">Close Collection</Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link href="/app/Collection/BurnCollection">Burn Collection</Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick('marketplace')}>
        Marketplace
        {mode == 'marketplace' ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={mode == 'marketplace'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

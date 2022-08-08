import { useState } from 'react'
import { useRouter } from 'next/router'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { Typography } from '@mui/material'

interface Props {
  onClick?: () => void
  width?: string
}

const PATH_NFT = '/app/NFT/'
const PATH_COLLECTION = '/app/Collection/'
const PATH_MARKETPLACE = '/app/Marketplace/'

const HelperList = ({ onClick, width = '200px' }: Props) => {
  const router = useRouter()

  const isCreateNFTPath = router.pathname.includes(`${PATH_NFT}CreateNFT`)
  const isBurnNFTPath = router.pathname.includes(`${PATH_NFT}BurnNFT`)
  const isDelegateNFTPath = router.pathname.includes(`${PATH_NFT}DelegateNFT`)
  const isSetRoyaltyPath = router.pathname.includes(`${PATH_NFT}SetRoyalty`)
  const isTransferNFTPath = router.pathname.includes(`${PATH_NFT}TransferNFT`)
  const isAddNftToCollectionPath = router.pathname.includes(`${PATH_NFT}AddNftToCollection`)
  const isCreateCollectionPath = router.pathname.includes(`${PATH_NFT}CreateCollection`)
  const isLimitCollectionPath = router.pathname.includes(`${PATH_NFT}LimitCollection`)
  const isCloseCollectionPath = router.pathname.includes(`${PATH_NFT}CloseCollection`)
  const isBurnCollectionPath = router.pathname.includes(`${PATH_NFT}BurnCollection`)
  const isCreateMarketplacePath = router.pathname.includes(`${PATH_NFT}CreateMarketplace`)
  const isSetMarketplaceConfigurationPath = router.pathname.includes(`${PATH_NFT}SetMarketplaceConfiguration`)
  const isSetMarketplaceOwnerPath = router.pathname.includes(`${PATH_NFT}SetMarketplaceOwner`)
  const isSetMarketplaceKindPath = router.pathname.includes(`${PATH_NFT}SetMarketplaceKind`)
  const isListNFTPath = router.pathname.includes(`${PATH_NFT}ListNFT`)
  const isUnlistNFTPath = router.pathname.includes(`${PATH_NFT}UnlistNFT`)
  const isBuyNFTPath = router.pathname.includes(`${PATH_NFT}BuyNFT`)

  const [NFT, setNFT] = useState(router.pathname.includes(PATH_NFT))
  const [collection, setCollection] = useState(router.pathname.includes(PATH_COLLECTION))
  const [marketplace, setMarketplace] = useState(router.pathname.includes(PATH_MARKETPLACE))

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
      sx={{ width, backgroundColor: '#0e0e23', overflowY: 'scroll', height: '100%', borderRadius: '16px', padding: '0.8rem 0' }}
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
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}CreateNFT`}>
              <Typography color={isCreateNFTPath ? 'primary' : undefined} fontFamily={isCreateNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Create NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}BurnNFT`}>
              <Typography color={isBurnNFTPath ? 'primary' : undefined} fontFamily={isBurnNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Burn NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}DelegateNFT`}>
              <Typography color={isDelegateNFTPath ? 'primary' : undefined} fontFamily={isDelegateNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Delegate NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}SetRoyalty`}>
              <Typography color={isSetRoyaltyPath ? 'primary' : undefined} fontFamily={isSetRoyaltyPath ? 'Airbnb Cereal App Bold' : undefined}>
                Set Royalty
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}TransferNFT`}>
              <Typography color={isTransferNFTPath ? 'primary' : undefined} fontFamily={isTransferNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Transfer NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_NFT}AddNftToCollection`}>
              <Typography color={isAddNftToCollectionPath ? 'primary' : undefined} fontFamily={isAddNftToCollectionPath ? 'Airbnb Cereal App Bold' : undefined}>
                Add NFT to Collection
              </Typography>
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
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_COLLECTION}CreateCollection`}>
              <Typography color={isCreateCollectionPath ? 'primary' : undefined} fontFamily={isCreateCollectionPath ? 'Airbnb Cereal App Bold' : undefined}>
                Create Collection
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_COLLECTION}LimitCollection`}>
              <a title="Limit Collection">
                <Typography color={isLimitCollectionPath ? 'primary' : undefined} fontFamily={isLimitCollectionPath ? 'Airbnb Cereal App Bold' : undefined}>
                  Limit Collection
                </Typography>
              </a>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_COLLECTION}CloseCollection`}>
              <Typography color={isCloseCollectionPath ? 'primary' : undefined} fontFamily={isCloseCollectionPath ? 'Airbnb Cereal App Bold' : undefined}>
                Close Collection
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_COLLECTION}BurnCollection`}>
              <Typography color={isBurnCollectionPath ? 'primary' : undefined} fontFamily={isBurnCollectionPath ? 'Airbnb Cereal App Bold' : undefined}>
                Burn Collection
              </Typography>
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
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}CreateMarketplace`}>
              <Typography color={isCreateMarketplacePath ? 'primary' : undefined} fontFamily={isCreateMarketplacePath ? 'Airbnb Cereal App Bold' : undefined}>
                Create Marketplace
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}SetMarketplaceConfiguration`}>
              <Typography
                color={isSetMarketplaceConfigurationPath ? 'primary' : undefined}
                fontFamily={isSetMarketplaceConfigurationPath ? 'Airbnb Cereal App Bold' : undefined}
              >
                Set Marketplace Configuration
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}SetMarketplaceOwner`}>
              <Typography
                color={isSetMarketplaceOwnerPath ? 'primary' : undefined}
                fontFamily={isSetMarketplaceOwnerPath ? 'Airbnb Cereal App Bold' : undefined}
              >
                Set Marketplace Owner
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}SetMarketplaceKind`}>
              <Typography color={isSetMarketplaceKindPath ? 'primary' : undefined} fontFamily={isSetMarketplaceKindPath ? 'Airbnb Cereal App Bold' : undefined}>
                Set Marketplace Kind
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}ListNFT`}>
              <Typography color={isListNFTPath ? 'primary' : undefined} fontFamily={isListNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                List NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}UnlistNFT`}>
              <Typography color={isUnlistNFTPath ? 'primary' : undefined} fontFamily={isUnlistNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Unlist NFT
              </Typography>
            </Link>
          </ListItemButton>
          <ListItemButton onClick={onClick} sx={{ pl: 4 }}>
            <Link href={`${PATH_MARKETPLACE}BuyNFT`}>
              <Typography color={isBuyNFTPath ? 'primary' : undefined} fontFamily={isBuyNFTPath ? 'Airbnb Cereal App Bold' : undefined}>
                Buy NFT
              </Typography>
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

export default HelperList

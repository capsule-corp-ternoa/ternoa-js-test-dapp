enum NFT {
  // NFT
  createNft = 'NFT creation',
  burnNft = 'NFT burning',
  delegateNft = 'Delegate NFT',
  setRoyalty = 'Set Royalty',
  transferNft = 'Transfer NFT',
  addNftToCollection = 'Add NFT to Collection',

  // Collection
  burnCollection = 'Collection burning',
  closeCollection = 'Collection closing',
  createCollection = 'Collection creation',
  limitCollection = 'Collection limit set',
}

export const TxTranslations = {
  nft: NFT,
}

export interface ICollection {
  collectionId: string
  offchainData: string
}

export interface INFT {
  nftId: string
  offchainData: string
}

export interface IMarketplace {
  marketplaceId: string
  offchainData: string
}

export interface ICollectionEntities {
  collectionEntities: {
    totalCount: number
    nodes: ICollection[]
  }
}

export interface INFTEntities {
  nftEntities: {
    totalCount: number
    nodes: INFT[]
  }
}

export interface IMarketplaceEntities {
  marketplaceEntities: {
    totalCount: number
    nodes: IMarketplace[]
  }
}

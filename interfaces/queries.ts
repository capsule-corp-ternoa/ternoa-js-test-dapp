export interface ICollection {
  collectionId: string
  offchainData: string
}

export interface INFT {
  nftId: string
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

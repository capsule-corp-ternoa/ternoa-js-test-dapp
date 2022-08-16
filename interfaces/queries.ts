export interface ICollection {
  collectionId: string
  offchainData: string
}

export interface ICollectionEntities {
  collectionEntities: {
    totalCount: number
    nodes: ICollection[]
  }
}

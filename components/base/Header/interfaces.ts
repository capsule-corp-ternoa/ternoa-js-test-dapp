import { Colors, Sizes, Variants } from 'components/ui/types'

export interface ILinks {
  href: string
  label: string
}

export interface IWeb3Providers {
  color: Colors
  icon: React.ReactNode
  size: Sizes
  text: string
  variant: Variants
}

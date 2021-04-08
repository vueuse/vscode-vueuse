import { PackageFunction } from './types'

export interface Cache {
  functions: PackageFunction[]
}

export const cache: Cache = {
  functions: [],
}

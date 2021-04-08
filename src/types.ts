export interface PackageFunction {
  name: string
  package: string
  docs: string
  category: string
  description: string
}

export interface Source {
  url?: string
  functions: PackageFunction[]
}

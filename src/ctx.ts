import { ExtensionContext } from 'vscode'

export interface Ctx {
  ext?: ExtensionContext
}

export const ctx: Ctx = {}

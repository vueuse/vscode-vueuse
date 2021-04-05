import { workspace } from 'vscode'

export function getConfig<T>(key: string, v?: T) {
  return workspace.getConfiguration().get(`vueuse.${key}`, v)
}

export const Config = {
  get browser() {
    return getConfig<'system' | 'embedded'>('browserType', 'embedded')!
  },
}

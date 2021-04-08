import { PackageFunction } from './types'
import { hasKey } from './util'
import { cache } from './cache'
import { ctx } from './ctx'

export function setState(key: string, value: any) {
  const { globalState: state } = ctx.ext!
  return state.update(key, value)
}

export function getState<T>(key: string): T {
  const { globalState: state } = ctx.ext!
  return state.get(key) as T
}

export async function updateFunctions(functions: PackageFunction[]) {
  const state = (await getFunctions())
    .filter(({ name }) => !hasKey('name', name, functions))
    .concat(functions)

  await setState('vueuse:functions', state)
  cache.functions = await getFunctions()
}

export async function getFunctions() {
  const state = await getState<PackageFunction[]>('vueuse:functions')
  if (!state)
    return []

  return state
}

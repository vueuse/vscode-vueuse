import { window, env, Uri, commands } from 'vscode'
import { cache } from './cache'
import { Config } from './config'

export function getHighlightedText() {
  const { selection: { start }, document } = window.activeTextEditor!
  return document.getText(document.getWordRangeAtPosition(start))
}

export function hasKey(key: string, value: string, obj: any[]) {
  for (const item of obj) {
    if (item[key] === value)
      return true
  }

  return false
}

export function openFunctionDocumentation(name: string) {
  const fn = cache.functions.find(x => x.name === name)

  if (Config.browser === 'system') {
    if (fn && fn.docs)
      env.openExternal(Uri.parse(fn.docs))
  }
  else {
    commands.executeCommand('browse-lite.open', fn?.docs)
  }
}

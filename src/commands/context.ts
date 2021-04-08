import { commands } from 'vscode'
import { cache } from '../cache'
import { getHighlightedText, openFunctionDocumentation } from '../util'

export function context() {
  openFunctionDocumentation(getHighlightedText())
}

export function contextFlag() {
  if (cache.functions.find(({ name }) => getHighlightedText() === name))
    commands.executeCommand('setContext', 'vueuse.showMenu', true)
  else
    commands.executeCommand('setContext', 'vueuse.showMenu', false)
}

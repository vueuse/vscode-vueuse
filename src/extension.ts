import { commands, ExtensionContext, window } from 'vscode'
import { browse, context, update, contextFlag } from './commands'
import { updateFunctions, getFunctions } from './data'
import { ctx } from './ctx'
import { cache } from './cache'

import sources from './sources'

export async function activate(_ctx: ExtensionContext) {
  ctx.ext = _ctx

  commands.executeCommand('setContext', 'vueuse.showMenu', false)
  const disposables = [
    commands.registerCommand('vueuse.browse', browse),
    commands.registerCommand('vueuse.context', context),
    commands.registerCommand('vueuse.update', update),
    window.onDidChangeTextEditorSelection(contextFlag),
  ]

  // Prime Data Store
  if ((await getFunctions()).length === 0)
    await updateFunctions(sources.map(({ functions }) => functions).flat())

  await update(true)
  cache.functions = await getFunctions()

  _ctx.subscriptions.push(...disposables)
}

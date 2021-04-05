import * as vscode from 'vscode'
import { functions } from './indexes.json'
import { Config } from './config'

let panel: any

async function openDocsForFunction(name: string) {
  const fn = functions.find(x => x.name === name)

  if (Config.browser === 'system') {
    if (fn && fn.docs)
      vscode.env.openExternal(vscode.Uri.parse(fn.docs))
  }
  else {
    if (panel) {
      try {
        panel.dispose()
        panel = undefined
      }
      catch (error) {}
    }

    panel = await vscode.commands.executeCommand('browse-lite.open', fn?.docs)
  }
}

function getHighlightedText() {
  const editor = vscode.window.activeTextEditor!

  const cursorPosition = editor?.selection.start
  const wordRange = editor?.document.getWordRangeAtPosition(cursorPosition)
  const highlight = editor?.document.getText(wordRange)

  return highlight
}

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('setContext', 'vueuse.showMenu', false)

  const browseDocs = vscode.commands.registerCommand('vueuse-docs.browseDocs', () => {
    const quickPick = vscode.window.createQuickPick()
    quickPick.items = functions.map(x => ({ label: x.name, detail: x.description, description: x.category }))
    quickPick.onDidChangeSelection(([item]) => {
      if (item) {
        openDocsForFunction(item.label)
        quickPick.dispose()
      }
    })
    quickPick.onDidHide(() => quickPick.dispose())
    quickPick.show()
  })

  const disposable = vscode.commands.registerCommand('vueuse-docs.openDocs', () => {
    openDocsForFunction(getHighlightedText())
  })

  const track = vscode.window.onDidChangeTextEditorSelection(() => {
    if (functions.find(x => x.name === getHighlightedText()))
      vscode.commands.executeCommand('setContext', 'vueuse.showMenu', true)
    else
      vscode.commands.executeCommand('setContext', 'vueuse.showMenu', false)
  })

  context.subscriptions.push(track)
  context.subscriptions.push(browseDocs)
  context.subscriptions.push(disposable)
}

export function deactivate() {}

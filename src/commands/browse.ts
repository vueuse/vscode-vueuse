import { window } from 'vscode'
import { cache } from '../cache'
import { openFunctionDocumentation } from '../util'

export function browse() {
  const picker = window.createQuickPick()

  picker.items = cache
    .functions
    .map(({ name, category, description }) => ({
      label: name,
      description: category,
      detail: description,
    }))

  picker.onDidChangeSelection(([item]) => {
    if (item) {
      openFunctionDocumentation(item.label)
      picker.dispose()
    }
  })
  picker.onDidHide(() => picker.dispose())
  picker.show()
}

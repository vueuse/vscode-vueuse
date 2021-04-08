import { window } from 'vscode'
import fetch from 'node-fetch'
import sources from '../sources'
import { updateFunctions } from '../data'

export async function update(silent?: boolean) {
  try {
    const results = await Promise.all(sources
      .filter(({ url }) => url)
      .map(({ url }) => fetch(url!).then(data => data.json())))

    await updateFunctions(
      results
        .filter(({ functions }) => functions)
        .map(({ functions }) => functions)
        .flat())

    if (!silent)
      window.showInformationMessage('Successfuly fetched the latest VueUse documentation.')
  }
  catch (error) {
    window.showErrorMessage('Failed to fetch the latest VueUse documentation.')
    console.error('VueUse: Failed to update documentation cache', error.message)
  }
}

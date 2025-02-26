import { WORKSPACE_MANIFEST_FILENAME } from '@pnpm/constants'
import { prepareEmpty } from '@pnpm/prepare'
import { updateWorkspaceManifest } from '@pnpm/workspace.manifest-writer'
import { readWorkspaceManifest } from '@pnpm/workspace.read-manifest'

import path from 'node:path'
import fs from 'node:fs'

test('updateWorkspaceManifest() creates a valid workspace file', async () => {
  const workspace = prepareEmpty()
  const value = { packages: ['*'] }

  await expect(
    updateWorkspaceManifest(workspace.dir(), value).then(() => true)
  ).resolves.toBe(true)

  expect(fs.existsSync(path.join(workspace.dir(), WORKSPACE_MANIFEST_FILENAME))).toBeTruthy()

  await expect(
    readWorkspaceManifest(workspace.dir())
  ).resolves.toEqual(value)
})

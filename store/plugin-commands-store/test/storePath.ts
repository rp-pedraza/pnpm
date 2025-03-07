import os from 'os'
import path from 'path'
import { STORE_VERSION } from '@pnpm/constants'
import { store } from '@pnpm/plugin-commands-store'
import { prepare } from '@pnpm/prepare'
import { REGISTRY_MOCK_PORT } from '@pnpm/registry-mock'

const REGISTRY = `http://localhost:${REGISTRY_MOCK_PORT}/`

test('CLI prints the current store path', async () => {
  prepare()

  const candidateStorePath = await store.handler({
    cacheDir: path.resolve('cache'),
    dir: process.cwd(),
    pnpmHomeDir: '',
    rawConfig: {
      registry: REGISTRY,
    },
    registries: { default: REGISTRY },
    storeDir: '/home/example/.pnpm-store',
    userConfig: {},
    dlxCacheMaxAge: 0,
    virtualStoreDirMaxLength: process.platform === 'win32' ? 60 : 120,
  }, ['path'])

  const expectedStorePath = os.platform() === 'win32'
    ? `\\home\\example\\.pnpm-store\\${STORE_VERSION}`
    : `/home/example/.pnpm-store/${STORE_VERSION}`

  expect(candidateStorePath).toBe(expectedStorePath)
})

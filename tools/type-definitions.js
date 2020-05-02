const endpointGroups = require('../dist/endpoints/endpoints').default
const fs = require('fs')
const output = [
  `import { RequestParams, RequestOptions } from './types'`,
  '',
  '// Module augmentation',
  `declare module './moviedb' {`,
  `  interface MovieDb {`
]

// Create the typings dynamically
for (const group of endpointGroups) {
  for (const endpoint of group.endpoints) {
    const method = group.prefix + (endpoint.name || '')

    output.push(`    ${method}(params?: string|number|RequestParams, options?: string|RequestOptions): Promise<any>`)
  }
}

output.push(`  }`, `}`, '')

// Write the type file
fs.writeFile('./src/moviedb-interface.ts', output.join('\n'), { encoding: 'UTF8' }, err => {
  if (err) {
    return console.error(err)
  }

  console.log('Finished!')
})

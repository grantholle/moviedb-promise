const endpoints = require('../lib/endpoints')
const fs = require('fs')
const output = [
  '// Type definitions for MovieDb',
  '// Project: moviedb-promise',
  '// Definitions by: Grant Holle <grantholle.com>',
  '',
  `const MovieDb = require('./index')`,
  '',
  'export = MovieDb',
  '',
  'declare class MovieDb {',
  `  constructor (apiKey: string, useDefaultLimits: boolean = false, baseUrl: string = 'https://api.themoviedb.org/3/')`
]

Object.keys(endpoints.methods).forEach(e => {
  const method = endpoints.methods[e]

  Object.keys(method).forEach(r => {
    output.push(`  ${e + r} (params: any, options?: any): Promise<any>`)
  })
})

Object.keys(endpoints.authentication).forEach(e => {
  output.push(`  ${e} (): Promise<string>`)
})

output.push(`}`, '')

// Write the type file
fs.writeFile('../index.d.ts', output.join('\n'), { encoding: 'UTF8' }, err => {
  if (err) {
    console.error(err)
  }

  console.log('Finished!')
})

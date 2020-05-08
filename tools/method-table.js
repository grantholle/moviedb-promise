const table = require('markdown-table')
const endpointGroups = require('./endpoints')
const output = []

output.push(['Function', 'Endpoint'])

for (const group of endpointGroups) {
  for (const endpoint of group.endpoints) {
    const method = group.prefix + (endpoint.name || '')

    output.push([method, endpoint.path])
  }
}

console.log(table(output))

const table = require('markdown-table')
const endpoints = require('../lib/endpoints')
const output = []

output.push(['Function', 'Endpoint'])

Object.keys(endpoints.methods).forEach(function (e) {
  const method = endpoints.methods[e]

  Object.keys(method).forEach(function (r) {
    output.push([e + r, method[r].resource])
  })
})

Object.keys(endpoints.authentication).forEach(function (e) {
  output.push([e, endpoints.authentication[e]])
})

console.log(table(output))

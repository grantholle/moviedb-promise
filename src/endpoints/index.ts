import { MovieDb } from '../moviedb'
import Configuration from './methods/configuration'
import { RequestParams, RequestOptions } from '../types'

const endpointGroups = [
  Configuration,
]

// Create the dynamic api methods
for (const group of endpointGroups) {
  for (const endpoint of group.endpoints) {
    const method = group.prefix + (endpoint.name || '')

    MovieDb.prototype[method] = async function (params: string|RequestParams = {}, options: RequestOptions = {}) {
      console.log(`calling ${method}`, params)

      return this.makeRequest(endpoint.verb, endpoint.path, params, options)
    }
  }
}

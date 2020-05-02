import { MovieDb } from '../moviedb'
import { RequestParams, RequestOptions } from '../types'
import endpointGroups from './endpoints'

// Create the dynamic api methods
for (const group of endpointGroups) {
  for (const endpoint of group.endpoints) {
    const method = group.prefix + (endpoint.name || '')

    MovieDb.prototype[method] = async function (
      params: string|number|RequestParams = {},
      options: string|RequestOptions = {}
    ) {
      return this.makeRequest(endpoint.verb, endpoint.path, params, options)
    }
  }
}

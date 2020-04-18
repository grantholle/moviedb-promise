import { MovieDb } from '../moviedb'
import Configuration from './methods/configuration'
import Find from './methods/find'
import { RequestParams, RequestOptions } from '../types'

const namespaces = [
  Configuration,
  Find,
]

// Create the dynamic api methods
for (const namespace of namespaces) {
  for (const endpoint of namespace.endpoints) {
    const method = namespace.prefix + (endpoint.name || '')

    MovieDb.prototype[method] = async function (params: string|RequestParams = {}, options: RequestOptions = {}) {
      console.log(`calling ${method}`, params)

      return this.makeRequest(endpoint.verb, endpoint.path, params, options)
    }
  }
}

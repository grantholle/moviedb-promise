import MovieDb from '../moviedb'
import Configuration from './methods/configuration'

const namespaces = [
  Configuration,
]

// Create the dynamic api methods
for (const namespace of namespaces) {
  for (const endpoint of namespace.endpoints) {
    const method = namespace.prefix + (endpoint.name || '')

    MovieDb.prototype[method] = async function (...parameters) {
      return this.makeRequest(endpoint.verb, endpoint.path, ...parameters)
    }
  }
}

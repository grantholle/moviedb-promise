import { HttpMethod, EndpointNamespace } from '../../types'

const Configuration: EndpointNamespace = {
  prefix: 'configuration',
  endpoints: [
    {
      path: 'configuration',
      verb: HttpMethod.Get
    }
  ]
}

export default Configuration

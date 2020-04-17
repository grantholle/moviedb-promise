import { HttpMethod, EndpointNamespace } from '../../types'

const Find: EndpointNamespace = {
  prefix: 'find',
  endpoints: [
    {
      path: 'find/:id',
      verb: HttpMethod.Get
    }
  ]
}

export default Find

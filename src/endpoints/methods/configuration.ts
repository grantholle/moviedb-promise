import {
  HttpMethod,
  EndpointGroup,
} from '../../types'

const Configuration: EndpointGroup = {
  prefix: 'configuration',
  endpoints: [
    {
      path: 'configuration',
      verb: HttpMethod.Get
    }
  ]
}

export default Configuration

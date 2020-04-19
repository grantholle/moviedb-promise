import { MovieDb } from '../../moviedb'
import {
  HttpMethod,
  EndpointGroup,
  Response,
  RequestOptions
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

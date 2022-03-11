import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory'

import introspectionQueryResultData from '~/graphql.schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

export default function (_context) {
  return {
    cache: new InMemoryCache({ fragmentMatcher }),
    httpEndpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}`,
    httpLinkOptions: {
      headers: {
        Authorization: 'Bearer ' + process.env.CTF_CDA_ACCESS_TOKEN,
      },
    },
  }
}
